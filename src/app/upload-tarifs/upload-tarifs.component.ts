import { Component } from '@angular/core';
import { first, fromEvent, Subject } from 'rxjs';
import { z } from 'zod';
import { Tarif, TarifService } from '../tarifs.service';

const fileSchema = z.array(Tarif);

@Component({
  selector: 'app-upload-tarifs',
  templateUrl: './upload-tarifs.component.html',
  styleUrls: ['./upload-tarifs.component.sass'],
})
export class UploadTarifsComponent {
  loadingSubject$: Subject<boolean> = new Subject();
  loading$ = this.loadingSubject$.asObservable();
  stateSubject$: Subject<string> = new Subject();
  state$ = this.stateSubject$.asObservable();

  constructor(private tarifService: TarifService) {}

  onFileSelected(event: Event) {
    this.loadingSubject$.next(true);
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    const fileReader$ = fromEvent(fileReader, 'load').pipe(first());

    fileReader.readAsBinaryString(file);

    fileReader$.subscribe((loaded) => {
      try {
        const data = JSON.parse((loaded?.target as any).result);
        fileSchema.parse(data); // should throw if not valid!

        this.tarifService.upload(data);

        this.loadingSubject$.next(false);
        this.stateSubject$.next(
          `Successfully uploaded #${data.length} tarifs!`
        );
      } catch (e) {
        this.loadingSubject$.next(false);
        this.stateSubject$.next('failed');
        console.error('failed', e);
      }
    });
  }
}
