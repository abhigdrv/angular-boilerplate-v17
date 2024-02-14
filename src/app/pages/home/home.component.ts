import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/configs/config.services';
import { ApiServiceService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: String = 'home';
  people: any = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 30 },
    { id: 4, name: 'Charlie', age: 22 },
    { id: 5, name: 'Charlie', age: 22 },
  ];

  constructor(
    private configService: ConfigService,
    private apiServiceService: ApiServiceService,
  ) {
    this.title = this.title.capitalizeFirstLetter();
    // console.log(this.people.groupBy((item: any) => item.age));
    // console.log(this.people.groupByKey('age'));
    // console.log(this.people.distinct());
    // console.log(this.people.distinctByKey('age'));
    // console.log(this.people.sortByKey((item: any) => item.age));
    // console.log(this.people.sortByKey('age'));
    // console.log(this.people.sum((item: any) => item.age));
    // console.log(this.people.sumByKey('age'));
    // console.log(this.people.chunk(2));
    // console.log(this.people.unique());
    // console.log(this.people.uniqueBy('age'));
    // console.log(this.people.remove({ id: 5, name: 'Charlie', age: 22 }));--BUG
    // console.log(this.people.removeByKeyValue('age', 22));
    // console.log(this.people.findIndexByKeyValue('age', 22));
    // console.log(this.people.findByKeyValue('age', 22));
  }

  ngOnInit(): void {
    this.getTestData();
  }
  entries: any;

  async getTestData() {
    this.entries = await this.configService.getPromise('facts', {})
  }
}
