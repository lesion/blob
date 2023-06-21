import prisma from './db.mjs'

export async function moveUp(blobIndex) {
  const blobs = await prisma.$queryRaw`SELECT id, ord FROM blob WHERE ord <= ${blobIndex} orDER BY ord DESC LIMIT 2`
  await prisma.blob.update({where: { id: blobs[0].id }, data: { ord: blobs[1].ord }})
  await prisma.blob.update({where: { id: blobs[1].id }, data: { ord: blobs[0].ord }})
}