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

module.exports = parseArgs;