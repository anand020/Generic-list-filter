import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class GenericListFilterComponent implements OnInit {
  @Input() list;
  @Input() paramList;
  @Output() onFilterChange = new EventEmitter();


  filterKeys1;
  selectedFilterTabType1; 
  selectedValues = [];
  selectedCategory = {
    type:'',
    value:''
  };
  filters;
  listCopy;


  filterKeys;
  isFiltersApplied = false;
  openFilterBar: boolean = false;
  timeFilter: boolean = false;
  allAppliedFilters;
  fromTime;
  toTime;
  searchKey = '';
  isCountClicked = false;
  isData = false;
  isStatus = false;
  step;
  category;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    setTimeout(() => {
      this.filterKeys1 = Object.keys(this.list);
      this.selectedFilterTabType1 = this.filterKeys1[0];
      this.fromTime = this.paramList && this.paramList.fromTime;
      this.toTime = this.paramList && this.paramList.toTime;
      this.listCopy = JSON.parse(JSON.stringify(this.list)) ;
      this.isStatus = this.list.isStatus;
      this.category = this.list.category;
      this.isData = true;
    }, 2000);
  }

  openFilterSideBar() {
    this.searchKey = '';
    this.list[this.selectedFilterTabType1] = this.listCopy[this.selectedFilterTabType1];
    this.openFilterBar = !this.openFilterBar;
  }

  onCancel() {
    this.openFilterBar = false;
  }



  onRemoveFilter(item) {
    if (item == 'time') {
      this.fromTime = moment().subtract(3, 'hours').format('LT');
      this.toTime = moment().format('LT');
      this.timeFilter = false;
    }
    delete this.allAppliedFilters[item];
    this.selectedValues = this.selectedValues.filter(obj => {
      return obj.type !== item;
    });
    console.log(item,this.allAppliedFilters,this.selectedValues);
    this.applyFilters();
  }



  applyFilters() {
    this.isFiltersApplied = true;
    this.openFilterBar = false;
    let allAppliedFilters = {};
    this.selectedValues.forEach(item => {
      allAppliedFilters[item.type] = item.value;
    });
  
    if (this.timeFilter) {
      allAppliedFilters['time'] = `${this.fromTime} to ${this.toTime}`;
    }
    console.log(allAppliedFilters);
    this.allAppliedFilters = allAppliedFilters;
    this.filterKeys = Object.keys(this.allAppliedFilters);
    this.filterChange();
  }

  setTime(type: string, event) {
    this.timeFilter = true;
    if (type === "fromTime") {
      this.fromTime = event;
    } else {
      this.toTime = event;
    };
  }


  filterChange() {
    let filters = {
      isFilter: true,
      appliedFilterValues:this.allAppliedFilters,
      // fromTime : this.timeFilter ? this.fromTime : '',
      // toTime : this.timeFilter ? this.toTime : ''
    }
    console.log(filters);
    this.onFilterChange && this.onFilterChange.emit(filters);
  }

  openRestAppliedFilters() {
    this.isCountClicked = true;
  }


  selectedFilterTab(type) {
    this.searchKey = '';
    let indx = _.findIndex(this.selectedValues,(item) => {
      return item.type == type;
    });
    if(indx > -1) {
      this.selectedCategory = {type:type,value:this.selectedValues[indx].value};
      this.selectFilter(this.selectedCategory.value,this.selectedCategory.type);
    }
    this.selectedFilterTabType1 = type;
  }

  isFilterExists(filter) {
    let indx = _.findIndex(this.selectedValues,(item) => {
      return item.type == filter && item.value;
    });
    if(indx > -1) {
      return true;
    }
  }


  selectFilter(item, type) {
    let value = {
      type : type,
      value: item
    };
    let indx = _.findIndex(this.selectedValues,(item) => {
      return item.type == type;
    });

    if(indx > -1) {
      this.selectedValues[indx].value = item;
      this.selectedCategory = {type:type,value:this.selectedValues[indx].value};
    } else {
      this.selectedValues.push(value);
      this.selectedCategory = {type:type,value:item};
    }
    console.log(this.selectedValues,this.selectedCategory);
  }




  resetAllFilters() {
    this.fromTime = moment().subtract(3, 'hours').format('LT');
    this.toTime = moment().format('LT');
    this.isFiltersApplied = false;
    this.timeFilter = false;
    this.openFilterBar = false;
    this.searchKey = '';
    this.filterKeys = '';
    this.allAppliedFilters = {};
    this.selectedValues = [];
    this.selectedFilterTabType1 = this.filterKeys1[0];
    this.selectedCategory = {
      type:'',
      value:''
    };
    this.isCountClicked = false;
    this.filterChange();
  }

  filterData(searchValue?) {
    this.list[this.selectedFilterTabType1] = this.listCopy[this.selectedFilterTabType1]; 
    let filterArr = this.list[this.selectedFilterTabType1];
    if (filterArr && filterArr.length) {
      const data = filterArr.filter((item) => {
        return (item.toLowerCase().startsWith(searchValue.trim().toLowerCase()));
      });
      console.log(this.searchKey,searchValue,"data=>"+data,this.list[this.selectedFilterTabType1])
      this.list[this.selectedFilterTabType1] = [...data];
    }
  }

}
