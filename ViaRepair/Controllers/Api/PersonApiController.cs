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
    [RoutePrefix("api/person")]
    public class PersonApiController : ApiController
    {
        PersonService _svc;

        public PersonApiController(PersonService service) {
            _svc = service;
        }

        [Route][HttpGet]
        public HttpResponseMessage Get()
        {
            ItemsResponse<Person> response = new ItemsResponse<Person>();
            response.Items = _svc.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}")][HttpPut]
        public HttpResponseMessage Put(PersonUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            SuccessResponse response = new SuccessResponse();
            _svc.Put(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route][HttpPost]
        public HttpResponseMessage Post(PersonAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            SuccessResponse response = new SuccessResponse();
            _svc.Post(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{Id:int}")][HttpDelete]
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
            Person response = new Person();
            response = _svc.GetById(Id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
       
    }
}
