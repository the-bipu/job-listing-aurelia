import data from '../static/data.json';

export class App {
  public data: typeof data = data;

  public clickedItems: { item: string, type: string }[] = [];

  public logItem(item: string, type: 'language' | 'tool'): void {
    const exists = this.clickedItems.some(
      clickedItem => clickedItem.item === item && clickedItem.type === type
    );

    if (!exists) {
      this.clickedItems.push({ item, type });
    }
  }

  public removeItem(clickedItem: { item: string, type: string }): void {
    this.clickedItems = this.clickedItems.filter(
      item => item.item !== clickedItem.item || item.type !== clickedItem.type
    );
  }

  public removeAllItems(): void {
    this.clickedItems.splice(0, this.clickedItems.length);
  }  

  public get filteredData() {
    if (this.clickedItems.length === 0) {
      return this.data;
    }

    return this.data.filter(card => {
      return this.clickedItems.every(clickedItem => {
        if (clickedItem.type === 'language') {
          return card.languages.includes(clickedItem.item);
        } else if (clickedItem.type === 'tool') {
          return card.tools.includes(clickedItem.item);
        }
        return false;
      });
    });
  }

}
