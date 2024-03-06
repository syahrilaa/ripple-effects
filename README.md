<h1 align="center">@syahakato/ripple-effect</h1>

``@syahakato/ripple-effect`` is third party made for those of you who want to make your elements have a Ripple effect

#### Features:
- Dynamic color ripple
- Easy to use

#### Uses Instructions:

1. Install the `@syahakato/ripple-effect` from terminal by npm or yarn.

```bash
npm i @syahakato/ripple-effect

yarn add @syahakato/ripple-effect
```

2. Import the `@syahakato/ripple-effect` in to your project.

```ts
import Ripple from '@syahakato/ripple-effect'
```

3. `@syahakato/ripple-effect` Ripple effect works by using events on elements. You need to initialize the Ripple() object first then use the add() method to get the ripple effect on the component.

```tsx
import React from 'react'
import Ripple from '@syahakato/ripple-effect'

function Example() {
  const ripple = new Ripple()
    return (
        <>
            <button onMouseUp={(e) => ripple.add(e)}>
                example ripple
            </button>
        </>
    );
}

export default Example
```