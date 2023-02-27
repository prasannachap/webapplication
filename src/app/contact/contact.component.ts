import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { contactModel } from '../models/contact.model';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from '../service/service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  phoneNo: number[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'phone', 'action']
  dataSource!: contactModel[];
  contactList: contactModel[] = [];
  tableData: MatTableDataSource<contactModel> = new MatTableDataSource<contactModel>([]);
  data: contactModel[] = [];
  id?: string;
  constructor(
    public FormBuilder: FormBuilder,
    private service: ContactService,
  ) {
  }

  ngOnInit(): void {
    this.view();
  }
  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  contactForm = this.FormBuilder.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    mobiles: this.FormBuilder.array([
      this.FormBuilder.control('', Validators.required)
    ]),
    email: ['', [Validators.required, Validators.email]]
  })


  mapToViewTable(contacts: contactModel[]) {
    this.tableData = new MatTableDataSource()
    // contacts.forEach((x) => {
    //   var con = new contactModel();
    //   con.id = x.id,
    //     con.address = x.address,
    //     con.email = x.email,
    //     con.firstName = x.firstName,
    //     con.lastName = x.lastName,
    //     con.mobiles = x.mobiles

    //   this.contactList.push(con);
    // });
    this.tableData = new MatTableDataSource(contacts);
  }

  submit() {
    const data = localStorage.getItem('ForEdit');
    const index = parseInt(data as string);
    if (data != null) {
      this.editContact(index);
    } else {
      const saveData = this.contactForm.value as contactModel;
      saveData.id = uuidv4();
      this.data = this.onSave(saveData) as contactModel | any;
      this.contactForm.reset();
      var oldData = JSON.parse(localStorage.getItem('saveData') as '[]') as contactModel[];
      this.mapToViewTable(oldData);
    }

    localStorage.removeItem('ForEdit');

  }

  async view() {
    this.data = await this.service.getAllContacts();
    const a = this.generateGuid();

    this.mapToViewTable(this.data);
    //   const saveData = this.contactForm.value as contactModel;
    //   // if (saveData.address == "" && saveData.firstName == "" && saveData.firstName == "") {

    //   // } else {
    //   this.data = this.onSave(saveData as contactModel);
    //   let i tems = JSON.parse(localStorage.getItem('saveData') as any);

    //   this.mapToViewTable(items as contactModel[]);

    //   // }

  }
  async onSave(data: contactModel) {
    var oldData = await this.service.getAllContacts() as contactModel[];

    if (oldData == null) {
      oldData = [];
      oldData[0] = data;
    } else {
      oldData.push(data);
    }
    // localStorage.setItem('saveData', JSON.stringify(oldData) as '[]');
    const a = this.service.saveContact(oldData);
    this.mapToViewTable(oldData);
    return oldData;
  }

  get mobiles() {
    const data = this.contactForm.get('mobiles') as FormArray;
    return data;
  }

  addPhone() {
    this.mobiles.push(this.FormBuilder.control(''))
  }

  deletePhone(index: number) {
    if (index == 0) {
      alert('error')
    } else {
      this.mobiles.removeAt(index);
    }
  }

  async deleteContact(index: number, event: Event) {

    await this.service.deleteContact(index, event);
    this.data = await this.service.getAllContacts() as contactModel[];

    this.mapToViewTable(this.data)

  }



  async editContact(index: number) {
    let currentData = await this.service.getContactById(index) as contactModel;
    const formData = this.contactForm.value;
    const data = currentData = formData as contactModel;
    let dataa = await this.service.getAllContacts() as contactModel[]
    dataa[index] = data as contactModel;
    await this.service.saveContact(dataa) as contactModel;
    this.contactForm.reset();
    this.mapToViewTable(dataa);


  }

  async patchValue(i: number) {
    localStorage.setItem('ForEdit', `${i}`);
    let data = await this.service.getContactById(i);
    if (data.mobiles?.length > 1) {

      for (let i = 0; i < data.mobiles.length - 1; i++) {
        this.mobiles.push(this.FormBuilder.control(''));
      }
    }
    this.contactForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      email: data.email,
      mobiles: data.mobiles
    })
  }

}
