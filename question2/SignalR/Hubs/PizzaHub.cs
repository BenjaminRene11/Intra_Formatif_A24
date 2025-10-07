using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            _pizzaManager.AddUser();
            int nbUser = _pizzaManager.NbConnectedUsers;
            await Clients.All.SendAsync("UpdateNbUsers", nbUser);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
            _pizzaManager.RemoveUser();
            int nbUser = _pizzaManager.NbConnectedUsers;
            await Clients.All.SendAsync("UpdateNbUsers", nbUser);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));
            int price = _pizzaManager.PIZZA_PRICES[(int)choice];
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            int qteArgent = _pizzaManager.Money[(int)choice];
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("PizzaChoisi", price, nbPizzas, qteArgent);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, _pizzaManager.GetGroupName(choice));
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            int money = _pizzaManager.Money[(int)choice];
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("AddMoney", money);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            int money = _pizzaManager.Money[(int)choice];
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("Buy", nbPizzas, money);
        }
    }
}
