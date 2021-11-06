import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../Models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  filterString='';
  students: Student[]=[];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender'
  ];

  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) magPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private studentService: StudentService) { }

  filterStudent(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    //fetch students
    this.studentService.getStudent().subscribe((successResponse)=>{
      this.students = successResponse;
      this.dataSource = new MatTableDataSource<Student>(this.students);

      if(this.magPaginator){
        this.dataSource.paginator = this.magPaginator;
      }

      if(this.matSort){
        this.dataSource.sort = this.matSort;
      }

    },
    (errorResponse)=>{
      console.log(errorResponse);
    }
    );
  }

}
