import { TextToImage } from "deepinfra";
import { createWriteStream } from "fs";
import { Readable } from "stream";

const DEEPINFRA_API_KEY = "y5Y0zQXusKriiXb8RY0MBjO7Qc52oRkU";
const MODEL = "black-forest-labs/FLUX-1-dev";

const main = async () => {
  const model = new TextToImage(MODEL, DEEPINFRA_API_KEY);
  const response = await model.generate({
    prompt: "a burger with a funny hat on the beach",
  });

  const result = await fetch(response.images[0]);

  if (result.ok && result.body) {
    let writer = createWriteStream("image2.png");
    Readable.fromWeb(result.body).pipe(writer);
  }
};

main();
