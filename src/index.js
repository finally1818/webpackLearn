{
  const obj = {
    name: 'finallyfdafdsfasdfsdafasd',
  }
  console.log(obj)

  const fn = () => {
    obj.age = 15
    console.log(obj)
  }
  fn()
}
