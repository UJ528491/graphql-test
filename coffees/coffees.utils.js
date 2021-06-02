import { createWriteStream } from "fs";

export const extractCategories = input => {
  const categories = input.match(/[^,]+/g) || [];
  return categories.map(category => {
    let slug = category.trim().replace(/\s+/g, "-").toLowerCase();
    return {
      where: { name: category },
      create: { name: category, slug },
    };
  });
};

export const extractFilesUrl = files => {
  return files.map(image_url => ({
    where: { url: image_url },
    create: { url: image_url },
  }));
};

export async function filesHandler(file) {
  const { filename, createReadStream } = await file;
  const newFilename = `${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
}
