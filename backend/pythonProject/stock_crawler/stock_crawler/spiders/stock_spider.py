
import scrapy
from bs4 import BeautifulSoup
class StockSpider(scrapy.Spider):
  name = "stock"
  stocks = []
  count = 0
  start_urls = ['https://swingtradebot.com/equities?page=']
  def get_stock_name(self, html):
    soup = BeautifulSoup(html, "html.parser")
    names = soup.find_all('tr')
    res = []
    for td in names:
        stock = td.find_all('a')[0].string.extract()
        res.append(stock)
    return res
  def parse(self, response):
    for page in range(1, 130):
        link = self.start_urls[0] + str(page)
        yield scrapy.Request(link, callback = self.crawlStock)

  def crawlStock(self, response):
      stock_list = (self.get_stock_name(response.xpath('//*[@id="main-content"]/div[3]/div/div[2]/div/div[2]/table/tbody').extract()[0]))
      self.stocks = self.stocks + stock_list
      self.count += 1
      if self.count == 129:
          self.stocks = sorted(self.stocks)
          with open('stocks.txt', 'w') as f:
              for stock in self.stocks:
                  f.write("%s\n" % stock)
