import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Launch {
  mission_name: string;
}
@Component({
  selector: 'app-space-x-launches',
  templateUrl: './space-x-launches.component.html',
})
export class SpaceXLaunchesComponent implements OnInit {
  loading = true;
  error: unknown;
  launches: Launch[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<{ launchesPast: Array<Launch> }>({
        query: gql`
          {
            launchesPast(limit: 10) {
              mission_name
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.launches = result?.data?.launchesPast;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
