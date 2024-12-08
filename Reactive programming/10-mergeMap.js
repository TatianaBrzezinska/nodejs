import { delay, mergeMap, of } from "rxjs";

const source$ = of("A", "B");

source$
  .pipe(mergeMap((value) => of(`${value} - transformed`).pipe(delay(1000))))
  .subscribe((result) => console.log(result));
