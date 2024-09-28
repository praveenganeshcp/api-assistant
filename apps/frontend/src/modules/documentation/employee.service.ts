import { BehaviorSubject, map, switchMap } from "rxjs";

import { ComponentStore } from "@ngrx/component-store";
import { tapResponse } from "@ngrx/operators";
import { Inject, Injectable } from "@angular/core";
import { API_BASE_URL } from "@api-assistant/commons-fe";
import { HttpClient } from "@angular/common/http";
export interface Employee {
    _id: string;
    name: string;
    department: string;
    city: string;
}

export type EmployeePayload = Employee;

interface EmployeesState {
    list: Employee[];
}

@Injectable({
    providedIn: "root"
})
export class EmployeesStore extends ComponentStore<EmployeesState> {

    constructor(
        @Inject(API_BASE_URL) private apiUrl: string,
        private httpClient: HttpClient,
    ) {
        super({
            list: []
        })
    }

    performCRUD(payload: any) {
        return this.httpClient.post(`${this.apiUrl}api/v6/core-engine/crud`, payload, {
            headers: {
                'api-assist-auth': '174054079ce01e3d8b341dcc2c17aed58685afa726b0c4bdc86ff1013548b686'
            }
        })
    }

    employees$ = this.select(state => state.list);

    deleteEmployee = this.effect<string>(id$ => {
        return id$.pipe(
            switchMap(id => {
                return this.performCRUD({
                    "crud": [
                        {
                          "collectionName": "employee",
                          "action": "deleteOne",
                          "payload": {
                            "filter": {
                                _id: `ObjectId(${id})`
                            }
                          }
                        }
                      ],
                      "response": {
                        "message": "Employee created successfully!",
                        "data": "${results.0}"
                      }
                }).pipe(
                    map(_ => ({ data: id }))
                )
            }),
            map((reponse: any) => reponse.data),
            tapResponse((deleteId: string) => {
                this.patchState(state => ({
                    list: state.list.filter(item => item._id !== deleteId)
                }))
            }, (err: unknown) => {
                console.error(err)
            })
        )
    })

    loadEmployees = this.effect<void>($ => {
        return $.pipe(
            switchMap(_ => {
                return this.performCRUD({
                    "crud": [
                        {
                          "collectionName": "employee",
                          "action": "find",
                          "payload": {
                            filter: {},
                            options: {}
                          }
                        }
                      ],
                      "response": {
                        "message": "Employee created successfully!",
                        "data": "${results.0}"
                      }
                })
            }),
            map((reponse: any) => reponse.data),
            tapResponse((data: Employee[]) => {
                this.patchState(state => ({
                    list: [...state.list, ...data]
                }))
            }, (err: unknown) => {
                console.error(err)
            })
        )
    })
    

    addEmployee = this.effect<Omit<EmployeePayload, "_id">>((payload$) => {
        return payload$.pipe(
            switchMap((payload) => {
                return this.performCRUD({
                    "crud": [
                      {
                        "collectionName": "employee",
                        "action": "insertOne",
                        "payload": payload
                      },
                      {
                        "collectionName": "employee",
                        "action": "findOne",
                        "payload": {
                          "filter": {
                            "_id": "${results.0.insertedId}"
                          },
                          "options": {}
                        }
                      }
                    ],
                    "response": {
                      "message": "Employee created successfully!",
                      "data": "${results.1}"
                    }
                  })
            }),
            map((reponse: any) => reponse.data),
            tapResponse((data: Employee) => {
                this.patchState(state => ({
                    list: [data, ...state.list]
                }))
            }, (err: unknown) => {
                console.error(err)
            })
        )
    })

    editEmployee = this.effect<EmployeePayload>((payload$) => {
        return payload$.pipe(
            switchMap((payload) => {
                return this.performCRUD({
                    "crud": [
                      {
                        "collectionName": "employee",
                        "action": "updateOne",
                        "payload": {
                            filter: {
                                _id: `ObjectId(${payload._id})`
                            },
                            patch: {
                                "$set": {
                                    name: payload.name,
                                    city: payload.city,
                                    department: payload.department
                                }
                            }
                        }
                      },
                      {
                        "collectionName": "employee",
                        "action": "findOne",
                        "payload": {
                          "filter": {
                            _id: `ObjectId(${payload._id})`
                        },
                          "options": {}
                        }
                      }
                    ],
                    "response": {
                      "message": "Employee updated successfully!",
                      "data": "${results.1}"
                    }
                  })
            }),
            map((reponse: any) => reponse.data),
            tapResponse((data: Employee) => {
                this.patchState(state => ({
                    list: state.list.map(emp => {
                        if(emp._id === data._id) {
                            return data
                        }
                        return emp
                    })
                }))
            }, (err: unknown) => {
                console.error(err)
            })
        )
    })

}