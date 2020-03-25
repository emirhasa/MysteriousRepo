using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebcaManageR.Hubs;

namespace WebcaManageR
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapControllerRoute("StreamRoute", "Stream", new { controller = "Home", action = "Stream" });
                endpoints.MapControllerRoute("ManageRoute", "Manage", new { controller = "Home", action = "Manage" });
                endpoints.MapHub<CentralHub>("/centralHub");
            });

            app.UseStaticFiles();
            app.UseHttpsRedirection();

            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute("StreamRoute", "Stream", new { controller = "Home", action = "Stream" });
            //    routes.MapRoute("ManageRoute", "Manage", new { controller = "Home", action = "Manage" });

            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});
        }
    }
}
