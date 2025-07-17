**to create the database (postgresql)**

```
CREATE TABLE topic (
    topic_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE card (
    card_id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    topic_id INTEGER NOT NULL,
    difficulty VARCHAR(255) NOT NULL,
    CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES topic(topic_id)
);
```
