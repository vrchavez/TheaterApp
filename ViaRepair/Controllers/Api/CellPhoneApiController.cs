using Models.Domain;
using Models.Requests;
using Models.Responses;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ViaRepair.Controllers.Api
{
    [RoutePrefix("api/cell")]
    public class CellPhoneApiController : ApiController
    {
        CellPhoneService _svc;

        public CellPhoneApiController(CellPhoneService service)
        {
            _svc = service;
        }

        [Route]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            ItemsResponse<CellPhone> response = new ItemsResponse<CellPhone>();
            response.Items = _svc.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}")]
        [HttpPut]
        public HttpResponseMessage Put(CellPhoneUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            SuccessResponse response = new SuccessResponse();
            _svc.Put(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route]
        [HttpPost]
        public HttpResponseMessage Post(CellPhoneAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            SuccessResponse response = new SuccessResponse();
            _svc.Post(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{Id:int}")]
        [HttpDelete]
        public HttpResponseMessage Delete(int Id)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            SuccessResponse response = new SuccessResponse();
            _svc.Delete(Id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{Id:int}")][HttpGet]
        public HttpResponseMessage GetById(int Id)
        {
            CellPhone response = new CellPhone();
            response = _svc.GetById(Id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

    }
}

