import HttpStatus from 'http-status';

class ItemController {
  constructor(Item) {
    this.Item = Item;
    
  }

  getName(data) {

       return this.Item.findAll({where: {name: { $like: { $any: this.ItensWillBeRegistered(data)}  } } })
                  .then(result => result )
                  .error(error => error.message);
  }

  ItensWillBeRegistered(items){

    let itensName = []
    for (let i = 0; i < items.length; i++) {
      itensName.push(items[i].name)
    }
    
    return itensName
  }

}
export default ItemController;
