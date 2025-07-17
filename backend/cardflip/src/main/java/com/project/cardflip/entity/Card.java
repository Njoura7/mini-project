package com.project.cardflip.entity;

import com.fasterxml.jackson.annotation.JsonMerge;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name="card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="card_id")
    private long id;

    @Column(name="question")
    @NotNull
    private String question;

    @Column(name="answer")
    @NotNull
    private String answer;

    @Column(name="topicId")
    @NotNull
    private long topicId;

    @Column(name="difficulty")
    @Enumerated(EnumType.STRING)
    @NotNull
    private Difficulty difficulty;

    public Card(String question, String answer, long topicId, Difficulty difficulty) {
        this.question = question;
        this.answer = answer;
        this.topicId = topicId;
        this.difficulty = difficulty;
    }

    public Card(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public long getTopicId() {
        return topicId;
    }

    public void setTopicId(long topicId) {
        this.topicId = topicId;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }


}
