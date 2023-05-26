const {
    exit,
    argv
} = process;

const instructions = `\n
    Argument 1 - "circle" || "square" || "triangle"
    Argument 2 - a valid color name or hex code.
    Argument 3 - text overlay, must be greater than 0 and less than 4 characters.
`

const validate = {
    shape: function (input) {
        const formatted = input.trim().toLowerCase();
        if (formatted !== "circle" && formatted !== "square" && formatted !== "triangle") {
            console.log(`Shape input invalid. ${instructions}`)
            return exit(1)
        }
        return input
    },
    color: function (input) {
        if (input.trim().length > 7) {
            console.log(`Color input invalid. ${instructions}`)
            return exit(1)
        }
        return input
    },
    text: function (input) {
        const formatted = input.trim().toUpperCase();
        const len = formatted.length;
        if (len < 0 || len > 3) {
            console.log(`Invalid text length. ${instructions}`);
            return exit(1)
        }
        return input
    }
}

const parseArgs = (arguments) => {
    if (arguments.length !== 5) {
        console.error(`Invalid # of arguments provided. ${instructions}`)
        exit(1)
    }

    const [_nodePath, _scriptPath, shape, color, text] = arguments;

    return [validate.shape(shape), validate.color(color), validate.text(text)]
}

function build(shape, color, text) {
    const shapeSwitch = {
        circle: `<circle cx="100" cy="100" r="100%" fill="${color}" />`,
        square: `<rect width="100%" height="100%" fill=${color} />`,
        triangle: `<polygon points="50,0 100,100 0,100" fill=${color} />`
    }

    return `
        <svg width="200" height="200" viewBox="0 0 100 100">
            ${shapeSwitch[shape]}
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="white">${text}</text> 
        </svg>
    `
}

async function write(string) {
    await require('fs/promises').writeFile('logo.svg', string)
}

async function main() {
    const [shape, color, text] = parseArgs(argv);

    const svgString = build(shape, color, text);

    await write(svgString)

    exit(0)
}

main()