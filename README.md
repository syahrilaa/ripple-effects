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
import React, { useRef, useEffect } from 'react'
import Ripple from '@syahakato/ripple-effect'

// Method 1
function MyButton() {
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
function MyButton2() {
  const ripple = new Ripple()
  return (
    <button onMouseUp={(e) => ripple.add(e)}>
      ripple 2
    </button>
  );
}
export default Example
```