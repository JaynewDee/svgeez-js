const parseArgs = require('./cli');
const {
    build,
    write
} = require('./shape');

async function main() {
    const [shape, color, text] = parseArgs(argv);

    const svgString = build(shape, color, text);

    await write(svgString)

    exit(0)
}

main()