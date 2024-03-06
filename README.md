<h1 align="center">@avioutils/ripple-effects</h1>

``@avioutils/ripple-effects`` is third party made for those of you who want to make your elements have a Ripple effect

#### Features:
- Dynamic color ripple
- Easy to use

#### Uses Instructions:

1. Install the `@avioutils/ripple-effects` from terminal by npm or yarn.

```bash
npm i @avioutils/ripple-effects

yarn add @avioutils/ripple-effects
```

2. Import the `@avioutils/ripple-effects` in to your project.

```ts
import Ripple from '@avioutils/ripple-effects'
```

3. `@avioutils/ripple-effects` Ripple effect works by using events on elements. You need to initialize the Ripple() object first then use the add() method to get the ripple effect on the component.

```tsx
import React, { useRef, useEffect } from 'react'
import Ripple from '@avioutils/ripple-effects'

// Method 1
export const MyButton = () => {
  const buttonRef = useRef(null)

  useEffect(() => {
    const ripple = new Ripple()
    ripple.new([ buttonRef ])
    return () => {

    }
  }, [])
  return (
    <button ref={buttonRef}>
      ripple 1
    </button>
  );
}

// Method 2
export const MyButton = () => {
  const ripple = new Ripple()
  return (
    <button onMouseUp={(e) => ripple.add(e)}>
      ripple 2
    </button>
  );
}
```