import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { expert } from "../interfaces/expert.interface";
import { Observable } from "rxjs";
import { Apollo, gql } from "apollo-angular";
const get_experts = gql`
  query {
    experts {
      items {
        id
        name
        bio
        job
        country
        photoUrl
      }
      endCursor
      hasNextPage
    }
  }
`;

const get_expert = gql`
  query expert_by_pk($_partitionKeyValue: String!, $id: ID!) {
    expert_by_pk(_partitionKeyValue: $_partitionKeyValue, id: $id) {
      id
      name
      bio
      job
      country
      photoUrl
    }
  }
`;

const post_createexpert = gql`
  mutation ($item: CreateexpertInput!) {
    createexpert(item: $item) {
      id
      name
      type
      city
      bio
      country
      photoUrl
    }
  }
`;

const post_updateexpert = gql`
  mutation updateexpert(
    $_partitionKeyValue: String!
    $id: ID!
    $item: UpdateexpertInput
  ) {
    updateexpert(
      _partitionKeyValue: $_partitionKeyValue
      id: $id
      item: $item
    ) {
      id
      name
      bio
      city
      country
      photoUrl
    }
  }
`;

const post_deleteexpert = gql`
  mutation deleteexpert($_partitionKeyValue: String!, $id: ID!) {
    deleteexpert(_partitionKeyValue: $_partitionKeyValue, id: $id) {
      id
      name
      bio
      city
      country
      photoUrl
    }
  }
`;

const get_suggestedexperts = gql`
  query ($filter: expertFilterInput!) {
    experts(filter: $filter) {
      items {
        id
        name
        city
        country
        photourl
      }
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class expertsService {
  private baseUrl: string = "";
  private limit: number = 6;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getexperts(): Observable<any> {
    return this.apollo.watchQuery<any>({ query: get_experts }).valueChanges;
  }

  getexpertById(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_expert,
      variables: { _partitionKeyValue: id, id: id },
    }).valueChanges;
  }

  getSuggestions(term: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_suggestedexperts,
      variables: { filter: { id: { contains: term } } },
    }).valueChanges;
  }

  addexpert(expert: expert): Observable<any> {
    return this.apollo.mutate({
      mutation: post_createexpert,
      variables: {
        item: {
          id: expert.id,
          name: expert.name,
          country: expert.country,
          wickets:expert.wickets,
          job: expert.job,
          photoUrl: expert.photoUrl,
        },
      },
    });
  }

  updateexpert(expert: expert): Observable<any> {
    return this.apollo.mutate({
      mutation: post_updateexpert,
      variables: {
        _partitionKeyValue: expert.id,
        id: expert.id,
        item: {
          id: expert.id,
          name: expert.name,
          country: expert.country,
          wickets:expert.wickets,
          job: expert.job,
          photoUrl: expert.photoUrl,
        },
      },
    });
  }

  deleteexpert(expert: expert): Observable<any> {
    return this.apollo.mutate({
      mutation: post_deleteexpert,
      variables: {
        _partitionKeyValue: expert.id,
        id: expert.id,
      },
    });
  }
}
