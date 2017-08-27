# Image Search Abstraction Layer

For [freeCodeCamp](http://freecodecamp.com) - [Back end → API Projects → Image Search Abstraction Layer](https://www.freecodecamp.org/challenges/image-search-abstraction-layer)

## User Stories

1. I can get the image URLs, ~~alt text~~ (the image provider I've chosen does not provide alt text) and page urls for a set of images relating to a given search string.

2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.

3. I can get a list of the most recently submitted search strings.

## Usage

```
https://image-search-abstraction-layer-js.glitch.me/search/cats
```

```
https://image-search-abstraction-layer-js.glitch.me/search/cats?offset=2
```

```
https://image-search-abstraction-layer-js.glitch.me/recent
```

## Output

```
[
   {
      "url":"https://pixabay.com/get/ee37b70620fd1c2ad65a5854e04c4192ea75e0c818b411429df6c77ea3ed_640.jpg",
      "thumbnail":"https://cdn.pixabay.com/photo/2015/04/17/09/36/domestic-cat-726989_150.jpg",
      "context":"https://pixabay.com/en/domestic-cat-cat-adidas-relaxed-726989/"
   },
    ...
   {
      "url":"https://pixabay.com/get/ef32b20b2de90825d0471403e64b429fe175ffd41cb1124993f6c67da7_640.jpg",
      "thumbnail":"https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345_150.jpg",
      "context":"https://pixabay.com/en/cat-feline-cat-face-cat-s-eyes-67345/"
   }
]
```

```
[
   {
      "term":"cats",
      "when":"2017-08-27T20:45:39.913Z"
   },
   {
      "term":"kittins",
      "when":"2017-08-27T20:45:36.112Z"
   },
   {
      "term":"mango",
      "when":"2017-08-03T12:53:08.289Z"
   },
   {
      "term":"chocolate",
      "when":"2017-08-03T12:52:37.719Z"
   }
]
```