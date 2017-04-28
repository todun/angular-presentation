import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList
  } from '@angular/core';
import { PresentationMode } from './../presentation-mode.enum';
import { Router } from '@angular/router';
import { SlideComponent } from './../slide/slide.component';

export interface SlideConfig {
  resize: boolean;
  shortcuts: boolean;
}
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  @Input() activeSlideIndex = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;

  @ContentChildren(forwardRef(() => SlideComponent))
  slides:QueryList<SlideComponent>;

  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string}>();
  areShortcutsEnabled = true;

  mode: PresentationMode = PresentationMode.none;

  private generatedSlideIndex = 0;

  registerSlide(id: string) {
    const index = this.generatedSlideIndex++;
    this.onSlideAdded.emit({index, id});
    return index;
  }

  get totalSlides() {
    return this.generatedSlideIndex;
  }

  nextSlide(isTriggeredByShortcut: boolean = false) {
    if (this.canGoNext() && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideIndex++;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  previousSlide(isTriggeredByShortcut: boolean = false) {
    if (this.canGoPrevious() && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideIndex--;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  canGoNext(): boolean {
    return this.activeSlideIndex + 1 < this.generatedSlideIndex;
  }

  canGoPrevious(): boolean {
    return this.activeSlideIndex > 0;
  }

  disableShortcuts() {
    this.areShortcutsEnabled = false;
  }

  enableShortcuts() {
    this.areShortcutsEnabled = true;
  }

  disableResize() {
    // TODO
  }

  print(){}
}
