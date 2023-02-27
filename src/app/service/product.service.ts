import { Injectable } from '@angular/core';
import { prodModel } from '../models/product.module';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'src/fireBase';

@Injectable({
    providedIn: 'root'
})

export class ProductServices {

    constructor() { }

    getAllPrds = async (): Promise<prodModel[]> => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
        });
        list;

        return list as prodModel[];
    }

    deletePrds = async (id: string): Promise<boolean> => {

        try {
            await deleteDoc(doc(db, "products", id))

            return true;
        } catch (error) {
            return false;
        }
    }


    getProductById = async (id: string): Promise<prodModel> => {
        const allPrd = await this.getAllPrds();
        debugger;
        try {
            const productById = allPrd.filter(item => id == item.id);

            return productById as prodModel | any;

        } catch (error: any) {
            return error.message
        }
    }

}