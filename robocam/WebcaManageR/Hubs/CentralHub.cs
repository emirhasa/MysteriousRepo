using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebcaManageR.Hubs
{
    public class CentralHub : Hub
    {
        public async Task SendCommand(string message)
        {
            await Clients.All.SendAsync("ReceiveCommand", message); 
        }

        public async Task SendRTCMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveRTCMessage", message);
        }

        public async Task SendImage(string message)
        {
            await Clients.All.SendAsync("ReceiveImage", message);
        }

    }
}
