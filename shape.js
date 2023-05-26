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