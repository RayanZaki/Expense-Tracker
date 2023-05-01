# Next.Js notes:

## Routes:

### Static & Dynamic Routes:
- In order to create routes:
  - We need to create for each route a file under the `pages` folder
  - If we want to use dynamic routes, we can name the file between brackets
- To get the query parameters in `next.js` you need to:
   - import the hook `next/Route.useRoute`
   - Then you can use `useRouter().query`
   - To get the current path in the dynamic route we can use `useRouter().query.filename`
  where `filename` is the name of the file between brackets

ex:

```javascript
import { useRouter } from "next/router";

const Home = () => {
    let Rout;
    Rout = useRouter();
    let about = rout.query.about;
    return (
        <h1>
            About Page {about}
        </h1>
    )
}
export default Home
```
## Catch All Routes:

- Catch All routes are pages that handle all the recursive routes of a directory in a single page 
- To define catch all routes:
  - Inside of the directory, name a file as follows `[...filename].tsx`
  - now the `useRoute().query.filename` will return an array of all paths

ex:
```javascript
import { useRouter } from "next/router";

const Params = () => {
    let rout = useRouter();

    const {params} = rout.query;
    console.log(params);
    return (
        <h1>
            Dir Home Page
        </h1>
    )
}

export default Params;
```
  - if you need to include the directory name without the /
    - you can name the file `[[...filename]].tsx`

## Link Component navigation:

- You can use the `link` component from `next/link`
- use the `href` to route to the page
- The replace prop will replace the `URL`  instead of pushing to it

```javascript
import Link from 'next/link'
const home = () => {
  return (
    <>
      <h1>Home Page</h1>
  <Link href="/path/to/route" replace>
      go to hi
  </Link>
    </>
  )
}

export default home;
```

## Navigating Programmatically:

- In `Next.Js` we can navigate to routes by using again the `useRoute()` hook
  - We can either `push(url)` or `replace(url)`

ex:
```javascript
import {useRouter} from "next/router";

const Home = () => {
    let route = useRouter()
    const handle =  () => {

        console.log("clicked");
        route.push("/dir/hi");
    }
  return (
    <>
      <h1>Home Page</h1>
        <button onClick={handle}>Place Order</button>
    </>
  )
}

export default Home;

```



