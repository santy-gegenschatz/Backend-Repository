import { serve } from "https://deno.land/std@0.52.0/http/server.ts";

const port = 4000;

const server = serve({ port });

const foo = (message: String): String => {
    return `Hello World from Deno 🦕! ${message}`;
}

const bar = (x: Int, y: Int): void => {
    console.log(x + y);
}

console.log(`http://localhost:${port}/`);
bar(1, 0);

for await (const req of server) {
    req.respond({body: foo('Hope you have a nice day!')});
}


