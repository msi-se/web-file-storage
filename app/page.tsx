import { MongoClient } from 'mongodb';
// import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
	Modal, 
	ModalContent, 
	ModalHeader, 
	ModalBody, 
	ModalFooter
  } from "@nextui-org/modal";

import DownloadFileButton from "@/components/DownloadFileButton";
import UploadModal from '@/components/UploadModal';

// get all documents from mongodb collection
export async function getFiles() {

	// create a new MongoClient
	let url = 'mongodb://localhost/web-file-storage';
	let client = new MongoClient(url);

	try {

        // wait for the connection to establish
        await client.connect();
        console.log('Connected to MongoDB');

        // create a new database
        let db = client.db('web-file-storage');
        
        // create a new collection
        let collection = db.collection('files');

        // get all documents in the collection
		// get name, filename, fileUuid, description, tags and creationDate
		let docs = await collection.find({}).toArray();
        console.log('Found documents:', docs);
		
		return docs;
    }

    catch (err: any) {
        console.log(err.stack);
    }

    finally {
        // close the connection
        await client.close();
        console.log('Closed connection to MongoDB');
    }

}

export default async function Home() {
	const files = await getFiles()
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			{files?.map((file) => 
				<div key={file.fileUuid} className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					<div>{file.filename}</div>
					<div>{file.fileUuid}</div>
					<div>{file.description}</div>
					<div>{file.tags.map((tag: string) => 
						<div key={tag}>{tag}</div>
					)}</div>
					<div>{file.creationDate.toString()}</div>
					<DownloadFileButton fileUuid={file.fileUuid} filename={file.filename} />
				</div>
			)}
		<UploadModal />
		</section>
	);
}

const downloadFile = async (fileUuid: string) => {
}