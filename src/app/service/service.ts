//get all
//get all from local and return list
//getbyondex(id)
//get all, filter by id, return matching else no result found

//addone(data)
//get all
//push data into all
//addall


//addall(listofdata)
//setitem intolocal //list of data

//find byname
//getall
//filter by name ( begins with)

//update(data, id)
//datas = getall
//datas[id] = data
//allall(datas)



import { Injectable } from "@angular/core";
import { contactModel } from "../models/contact.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: "root",
})

export class ContactService {
    constructor(
        private httpClient: HttpClient
    ) { }


    getAllContacts = async (): Promise<contactModel[]> => {
        return JSON.parse(localStorage.getItem('saveData') as '[]');

    }

    getContactById = async (id: number): Promise<contactModel> => {
        return JSON.parse(localStorage.getItem('saveData') as string)[id];

    }

    saveContact = async (contact: contactModel[]): Promise<contactModel> => {
        localStorage.setItem('saveData', JSON.stringify(contact));
        return contact[0];
    }

    deleteContact = async (index: number, event: Event): Promise<boolean> => {
        event.preventDefault();
        const data = await this.getAllContacts();

        if (data !== null) {
            data.splice(index, 1);
            this.saveContact(data);

            return true;
        } else {
            return false;
        }
    }


}