import { error, json, type RequestHandler } from '@sveltejs/kit';
import { read } from '$app/server';
import csv from 'csvtojson';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as data from '$lib/data/data.json';

type RawData = { Date: string; Amount: string; Balance: string; Description: string }[];

export const POST: RequestHandler = async ({ request }) => {
	// TODO: remove hard coded json

	const cleanData = (rawData: RawData) => {
		const newData = [];
		for (const obj of rawData) {
			const { Date, Description, Amount, Balance } = obj;
			const newObj = {
				date: Date,
				description: Description.replace(/  +/g, ' '),
				amount: parseFloat(Amount.replace(',', '').replace('$', '')),
				balance: parseFloat(Balance.replace(',', '').replace('$', ''))
			};

			newData.push(newObj);
		}
		return newData;
	};

	return json(cleanData(data.default));
};
