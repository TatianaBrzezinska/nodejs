import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class HomeComponent implements OnInit {
  tweetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tweetService: TweetService,
  ) {}
  //@ts-ignore

  tweets: any[] = [];

  ngOnInit() {
    this.tweetForm = this.fb.group({
      content: ['', Validators.required],
    });
    this.loadTweets();
  }

  postTweet() {
    if (this.tweetForm.valid) {
      //@ts-ignore
      this.tweetService.postTweet(this.tweetForm.value).subscribe(() => {
        this.tweetForm.reset();
        this.loadTweets();
      });
    }
  }

  loadTweets() {
    this.tweetService.getTweets().subscribe((data) => {
      this.tweets = data;
    });
  }
}
