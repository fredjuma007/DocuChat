import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { get } from "http";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { pinecone } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
 
const f = createUploadthing();
 

export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
   
    .middleware(async ({ req }) => {

        const { getUser } = getKindeServerSession()
        const user = getUser()

        if(!user || !user.id) throw new Error("Unauthorized")

        return { userId: user.id }

    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create ({
        data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`, // always use the key to get the file
            uploadStatus: "Processing",
        }
      })

      try{
        const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)

        const pageLevelDocs = await loader.load()

        const pageAmt = pageLevelDocs.length

        // vectorize and index the entire document

        const pineconeIndex = pinecone.Index('docuchat')

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY
        })

      } catch (err) {

      }

    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;