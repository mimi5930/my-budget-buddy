import { json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';
import csv from 'csvtojson';

type RawData = { Date: string; Amount: string; Balance: string; Description: string }[];

export const POST: RequestHandler = async ({ request }) => {
	// create json from csv file input
	const formData = Object.fromEntries(await request.formData());
	const { file } = formData as { file: File };
	const fileData = await file.text();
	const jsonData = await csv().fromString(fileData);

	// sanitize data
	const cleanData = (rawData: RawData) => {
		const newData = [];
		for (const obj of rawData) {
			const { Date, Description, Amount, Balance } = obj;
			// create a hash to ensure no records are duplicated in db
			const uniqueHashString = Date + Description + Balance;
			const newObj = {
				id: crypto.createHash('sha1').update(uniqueHashString).digest('hex'),
				date: Date,
				description: Description.replace(/  +/g, ' '),
				amount: parseFloat(Amount.replace(',', '').replace('$', '')),
				balance: parseFloat(Balance.replace(',', '').replace('$', ''))
			};

			newData.push(newObj);
		}
		return newData;
	};

	return json(cleanData(jsonData));
};
