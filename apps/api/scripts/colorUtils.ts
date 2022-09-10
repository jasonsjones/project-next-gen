
/*
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
*/

const FG_CYAN = "\x1b[36m"
const FG_GREEN = "\x1b[32m"
const FG_MAGENTA = "\x1b[35m"
const RESET = "\x1b[0m"
const BRIGHT = "\x1b[1m"

function colorFnFactory(color: string, decoration: string = "") {
    return (msg: string) => {
        return `${color}${decoration}${msg}${RESET}`;
    }
}

export const cyan = colorFnFactory(FG_CYAN);
export const magenta = colorFnFactory(FG_MAGENTA);
export const brightGreen = colorFnFactory(FG_GREEN, BRIGHT);

