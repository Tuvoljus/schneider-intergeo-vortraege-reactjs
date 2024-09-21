import React, { useState } from 'react';
import convertCsvToJson from 'convert-csv-to-json';
import Papa, { ParseResult } from "papaparse";
import csvToJson from 'convert-csv-to-json'

export interface ScheduleItem {
  Date: string;

  LogoImportName: string;
  Company: string | null; // Allow null
  "Software / Title": string | null;
  Speaker: string | null;
}

type Callback = (data: any) => void;

// const convertCsvToJson = () => {
// let fileInputName = '/src/data/schedule_2.csv'; 
// let fileOutputName = '/src/data/scheduleJSON.json';

// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
// }

export const useFetch = () => {
  const fetchCsvData = async (filePath: string, callback: Callback) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Fehler beim Laden der Datei: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Fehler beim Lesen des Dateiinhalts');
      }

      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvString = decoder.decode(result.value);

      Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true, // Überspringt leere Zeilen
        complete: (results: ParseResult<ScheduleItem>) => {
          console.log('Parsing abgeschlossen:', results.data);
          if (results.errors.length) {
            console.error('Parsing Fehler:', results.errors);
          } else {
            callback(results.data);
          }
        },
        error: (error: any) => {
          console.error('Fehler beim Parsen der CSV:', error);
        },
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der CSV-Datei:', error);
    }
  };

  return { fetchCsvData };
};

  
  

