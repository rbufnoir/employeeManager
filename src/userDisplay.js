import { Employee } from './Employee.js'
import { phoneInput } from './checkForm.js'

export async function checkRegisterCompletion() {
  const user = await Employee.getUserById(localStorage.getItem('id'));
  if (user.inscriptionComplete)
    displayUser(user)
  else
    completeRegister(user)
}

function completeRegister(user) {
  document.getElementById('contenu').innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    Please complete your inscription!
                </div>
                <div class="modal-body">
                  <form id="formComplete">
                    <label class="col-form-label" for="adress">Adress: </label>
                    <input class="form-control" name="adress" type="text" required>
                    <label class="col-form-label" for="phoneNumber">Phone number: </label>
                    <input id="phone" class="form-control" name="phoneNumber" type="phone" required>
                  </form>
                </div>
                <div class="modal-footer">
                    <button id="completeInscription" type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
    `;
  const myModal = bootstrap.Modal.getOrCreateInstance('#staticBackdrop');
  myModal.show();

  phoneInput();
  document.getElementById('completeInscription').addEventListener('click', () => {
    myModal.hide();
    user.addField({
      adress: document.getElementById('formComplete')['adress'].value,
      phoneNumber: document.getElementById('formComplete')['phoneNumber'].value,
      inscriptionComplete: true
    })
    displayUser(user);
  });

}

function displayUser(user) {
  document.getElementById('contenu').innerHTML =
    `<div class="col-lg-4">
                      <div class="card mb-4">
                        <div class="card-body text-center">
                          <img src="${user.avatarAdress}" alt="avatar"
                            class="rounded-circle img-fluid" style="width: 150px;">
                          <h5 class="my-3">${user.fName} ${user.lName}</h5>
                          <p class="text-muted mb-1">Full Stack Developer</p>
                          <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                        </div>
                      </div>
                      <div class="card mb-4 mb-lg-0">
                        <div class="card-body p-0">
                          <ul class="list-group list-group-flush rounded-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <div class="col-sm-4">
                                <p class="mb-0">Contract</p>
                              </div>
                              <div class="col-sm-8">
                                <p class="mb-0 text-muted">${user.contract}</p>
                              </div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <div class="col-sm-4">
                                <p class="mb-0">Contract start</p>
                              </div>
                              <div class="col-sm-8">
                                <p class="mb-0 text-muted">${user.contractStart.toLocaleDateString()}</p>
                              </div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <p class="mb-0">Edit Profil</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <p class="mb-0">Team chat</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <p class="mb-0">Contact</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-8">
                      <div class="card mb-4">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Full Name</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">${user.fName} ${user.lName}</p>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">${user.email}</p>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">${user.phoneNumber}</p>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Birthday</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">${user.birthday.toLocaleDateString()}</p>
                            </div>
                          </div>
                          <hr>
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                              <p class="text-muted mb-0">${user.adress}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="card mb-4 mb-md-0">
                            <div class="card-body">
                              <p class="mb-4"><span class="text-primary font-italic me-1">Assigment</span> Project Status
                              </p>
                              <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                              <div class="progress rounded mb-2" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="card mb-4 mb-md-0">
                            <div class="card-body">
                              <p class="mb-4"><span class="text-primary font-italic me-1">Assigment</span> Project Status
                              </p>
                              <p class="mb-1" style="font-size: .77rem;">Web Design</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                              <div class="progress rounded" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                              <div class="progress rounded mb-2" style="height: 5px;">
                                <div class="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66"
                                  aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`
}