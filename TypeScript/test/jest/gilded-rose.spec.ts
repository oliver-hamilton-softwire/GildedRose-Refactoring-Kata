import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should degrade the quality twice as fast', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(38);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should ensure quality is never negative', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(9);
  });

  it('should ensure "Aged Brie" increases in quality as it ages', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(9);
  });

  it('should ensure quality is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });

  it('should ensure Sulfuras never has to be sold or decreases in quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });

  it('should ensure Backstage Passes increase in Quality only by 1 if its SellIn value is greater than 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(41);
    expect(items[0].sellIn).toBe(10);
  });

  it('should ensure Backstage Passes increase in Quality by 2 if its SellIn value is between 6 and 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(42);
    expect(items[0].sellIn).toBe(9);

    const gildedRose2 = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 40)]);
    const items2 = gildedRose2.updateQuality();
    expect(items2[0].quality).toBe(42);
    expect(items2[0].sellIn).toBe(5);
  });

  it('should ensure Backstage Passes increase in Quality by 3 if its SellIn value is less than 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(43);
    expect(items[0].sellIn).toBe(3);
  });

  it('should ensure quality drops to 0 after a concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  // New test for 'Conjured' items
  it('should ensure \'Conjured\' items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 5, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(38);
    expect(items[0].sellIn).toBe(4);

    const gildedRose2 = new GildedRose([new Item('Conjured', 4, 1)]);
    const items2 = gildedRose2.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(3);
  });
});
