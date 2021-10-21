const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const main = document.querySelector(".main");
const projects = document.querySelector(".projects");
const tickets = document.querySelector(".tickets");
const overlayProjectInput = document.querySelector("#overlayProjectInput");
const overlayProjectDetail = document.querySelector("#overlayProjectDetails");
const overlayTicketInput = document.querySelector("#overlayTicketInput");

const overlayProjectDetails = document.querySelector("#overlayProjectDetails");
const overlayTicketDetails = document.querySelector("#overlayTicketDetials");

const controlProject = document.querySelector("#controlProject");
const controlTicket = document.querySelector("#controlTicket");
const controlComment = document.querySelector("#controlComment");
const overlayTicketDetials = document.querySelector("#overlayTicketDetials");

const checkbox = document.querySelector(".checkbox");
//Comment
const addComment = document.querySelector("#overlayCommentInput");
const overlay = document.querySelector(".overlay");

//handel UI
function toggleManu() {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
  main.classList.toggle("active");
  tickets.classList.toggle("active");
  projects.classList.toggle("active");
  overlay.classList.toggle("active");
  overlayProjectDetail.classList.toggle("active");
  overlayTicketInput.classList.toggle("active");
  overlayTicketDetials.classList.toggle("active");
}
// Main Dahshbord
function dashboard() {
  main.classList.remove("hide");
  projects.classList.add("hide");
  tickets.classList.add("hide");
}
//Project Dashboard
function projectsDashboard() {
  projects.classList.remove("hide");
  main.classList.add("hide");
  tickets.classList.add("hide");
}
//Ticket Dashboard
function ticketsDashboard() {
  tickets.classList.remove("hide");
  main.classList.add("hide");
  projects.classList.add("hide");
}
//Project Input
function closeModalProject() {
  overlayProjectInput.classList.add("hide");
}

function openModalProject() {
  overlayProjectInput.classList.remove("hide");
}
//Ticket Input
function openModalTicket() {
  overlayTicketInput.classList.remove("hide");
}

function closeModalTicket() {
  overlayTicketInput.classList.add("hide");
  UI.clearTicketInputs();
}

function showAllProjects() {
  main.classList.add("hide");
  projects.classList.remove("hide");
}

function showAllTickets() {
  main.classList.add("hide");
  tickets.classList.remove("hide");
  UI.clearProjectDetails();
}
//Details
function closeProjectDetail() {
  overlayProjectDetails.classList.add("hide");
  controlProject.classList.add("hide");
  UI.clearProjectDetails();
}
//Detials
function closeTicketDetail() {
  overlayTicketDetails.classList.add("hide");
  controlTicket.classList.add("hide");
  UI.clearTicketDetails();
  UI.clearDataId();
  UI.clearCommentList();
}
function openTicketDetail() {
  overlayTicketDetails.classList.remove("hide");
}
function control() {
  controlProject.classList.toggle("hide");
  controlTicket.classList.toggle("hide");
}
function controlCommentButton() {
  const controlComment = document.querySelector("#controlComment");
  controlComment.classList.toggle("hide");
}

//Comment Modal
function openCommentModal() {
  overlayTicketDetails.classList.add("hide");
  addComment.classList.remove("hide");
}
function closeCommentModal() {
  addComment.classList.add("hide");
  overlayTicketDetails.classList.remove("hide");
}
/*END OF FUNCTIONS */

//Project Class
class Project {
  constructor(id, details, status, importance, date, targetDate) {
    this.id = id;
    this.details = details;
    this.status = status;
    this.importance = importance;
    this.date = date;
    this.targetDate = targetDate;
  }
}
//Ticket Class
class Ticket extends Project {
  constructor(
    title,
    id,
    description,
    assignedPersonel,
    importance,
    status,
    ticketType,
    date
  ) {
    super();
    this.title = title;
    this.id = id;
    this.description = description;
    this.assignedPersonel = assignedPersonel;
    this.importance = importance;
    this.status = status;
    this.ticketType = ticketType;
    this.date = date;
  }
}
//Ticket Comment Class
class Comment extends Ticket {
  constructor(commenter, message, date, title, id) {
    super();
    this.id = id;
    this.title = title;
    this.commenter = commenter;
    this.message = message;
    this.date = date;
  }
}
//UI Class
class UI {
  static UIDashboard() {
    document.querySelector("#numberOfProjects").textContent =
      Store.getProjects().length;
    document.querySelector("#numberOfTickets").textContent =
      Store.getTickets().length;
  }
  static successfullAlert() {
    function greenColor(r, g, b, a) {
      return `rgba(${139}, ${228}, ${98}, ${0.726})`;
    }

    function greyColor(r, g, b, a) {
      return `rgba(${238}, ${238}, ${238}, ${1})`;
    }

    const backgroundProjects = document.querySelector("#projectList");
    const backgroundTickets = document.querySelector("#ticketList");
    const backgroudComments = document.querySelector("#commentList");
    function successfull() {
      backgroundProjects.style.background = greenColor();
      backgroundTickets.style.background = greenColor();
      backgroudComments.style.background = greenColor();
    }
    function exitSuccessfull() {
      backgroundProjects.style.background = greyColor();
      backgroundTickets.style.background = greyColor();
      backgroudComments.style.background = greyColor();
    }
    successfull();
    setTimeout(exitSuccessfull, 1000);
  }

  //UI for Projects
  static displayProjects() {
    const projects = Store.getProjects();

    projects.forEach((project) => UI.addProjectToList(project));
    projects.slice(Math.max(projects.length - 5, 1));
    projects.forEach((project) => UI.addProjectToDashboard(project));
    /*alternative implementation 
    projects.forEach((project, index) => {
      if (index > -1) {
        UI.addProjectToDashboard(project);
      }
    });
    */
  }
  static addProjectToList(project) {
    const list = document.querySelector("#projectList");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${project.id}</td>
      <td>${project.details}</td>
      <td>${project.status}</td>
      <td>${project.importance}</td>
      <td>${project.date}</td>
      <td>${project.targetDate}</td>
      `;
    list.appendChild(row);
    row.setAttribute("id", `${project.id}`);
  }
  static addProjectToDashboard(project) {
    const list = document.querySelector("#dashboardRecentProjectList");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${project.details}</td>
        <td>${project.importance}</td>
        <td>${project.targetDate}</td>
       `;
    list.appendChild(row);
  }
  static clearProjectInputs() {
    document.querySelector("#id").value = "";
    document.querySelector("#details").value = "";
    document.querySelector("#status").value = "";
    document.querySelector("#importance").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#targetDate").value = "";
  }
  static submitCloseModalProject() {
    document.querySelector("#overlayProjectInput").classList.add("hide");
  }
  static invalidAlertProject() {
    //color
    function invalidColor(r, g, b, a) {
      return `rgba(${255}, ${0}, ${0}, ${0.5})`;
    }
    function overlayNormal(r, g, b, a) {
      return `rgba(${0}, ${0}, ${0}, ${0.4})`;
    }
    function whiteColor(r, g, b, a) {
      return `rgba(${255}, ${255}, ${255}, ${1})`;
    }
    function invalidInput() {
      //inputs
      const id = document.querySelector("#id");
      const description = document.querySelector("#details");
      const status = document.querySelector("#status");
      const importance = document.querySelector("#importance");
      const date = document.querySelector("#date");
      const targetDate = document.querySelector("#targetDate");
      const assignedPersonel = document.querySelector("#assignPersonel");
      //overlay
      const overlay = document.querySelector("#overlayProjectInput");

      //set Color
      id.style.backgroundColor = invalidColor();
      description.style.backgroundColor = invalidColor();
      status.style.backgroundColor = invalidColor();
      importance.style.backgroundColor = invalidColor();
      date.style.backgroundColor = invalidColor();
      targetDate.style.backgroundColor = invalidColor();
      assignedPersonel.style.backgroundColor = invalidColor();
      //overlay
      overlay.style.backgroundColor = invalidColor();

      id.placeholder = "Enter Valid Input";
      description.placeholder = "Enter Valid Input";
      status.placeholder = "Enter Valid Input";
      importance.placeholder = "Enter Valid Input";
      // date.placeholder = "Enter Valid Input";
      // targetDate.placeholder = "Enter Valid Input";
      assignedPersonel.placeholder = "Enter Valid Input";

      id.style.color = "White";
      description.style.color = "White";
      status.style.color = "White";
      importance.style.color = "White";
      date.style.color = "White";
      targetDate.style.color = "White";
      assignedPersonel.style.color = "White";
    }
    function exitInvalid() {
      //inputs
      const id = document.querySelector("#id");
      const description = document.querySelector("#details");
      const status = document.querySelector("#status");
      const importance = document.querySelector("#importance");
      const date = document.querySelector("#date");
      const targetDate = document.querySelector("#targetDate");
      const assignedPersonel = document.querySelector("#assignPersonel");
      //overlay
      const overlay = document.querySelector("#overlayProjectInput");

      //set Color
      id.style.backgroundColor = whiteColor();
      description.style.backgroundColor = whiteColor();
      status.style.backgroundColor = whiteColor();
      importance.style.backgroundColor = whiteColor();
      date.style.backgroundColor = whiteColor();
      targetDate.style.backgroundColor = whiteColor();
      assignedPersonel.style.backgroundColor = whiteColor();
      //overlay
      overlay.style.backgroundColor = overlayNormal();

      id.placeholder = "ID";
      description.placeholder = "Descripton";
      status.placeholder = "Status";
      importance.placeholder = "Importance";
      // date.placeholder = "Date";
      // targetDate.placeholder = "Target Date";
      assignedPersonel.placeholder = "Assigned Personel";

      id.style.color = "Black";
      description.style.color = "Black";
      status.style.color = "Black";
      importance.style.color = "Black";
      date.style.color = "Black";
      targetDate.style.color = "Black";
      assignedPersonel.style.color = "Black";
    }
    invalidInput();
    setTimeout(function () {
      exitInvalid();
    }, 3000);
  }
  static openProjectDetials(e) {
    //access storage
    let displayTickets = Store.getTickets();

    //open modal on click
    let project = e.target.parentElement;
    let modal = document.querySelector("#overlayProjectDetails");
    modal.classList.remove("hide");
    let projectDetialName = document.querySelector(".projectDetailName");
    projectDetialName.setAttribute("id", `${project.id}`);
    projectDetialName.innerHTML = `Detials for Project ${project.id}`;

    for (let i = 0; i < displayTickets.length; i++) {
      if (displayTickets[i].id === e.target.parentElement.id) {
        //display tickets in project details
        const list = document.querySelector("#assignedTicketsList");
        const row = document.createElement("tr");
        row.setAttribute("id", `${displayTickets[i].title}`);
        row.innerHTML = `
      <td>${displayTickets[i].title}</td>
      <td>${displayTickets[i].assignedPersonel}</td>
      <td>${displayTickets[i].status}</td>
      <td>${displayTickets[i].date}</td>`;
        list.appendChild(row);
      }
    }
  }

  // UI for Tickets
  static displayTickets() {
    const tickets = Store.getTickets();

    tickets.forEach((ticket) => UI.addTicketToList(ticket));
    //  tickets.slice(Math.max(tickets.length - 1, 1));
    //  tickets.forEach((ticket) => UI.addTicketToDashboard(ticket));
    tickets.forEach((ticket, index) => {
      if (index > 0) {
        UI.addTicketToDashboard(ticket);
      }
    });
  }
  static addTicketToList(ticket) {
    const list = document.querySelector("#ticketList");
    const row = document.createElement("tr");
    row.setAttribute("id", `${ticket.id}`);
    row.innerHTML = `
      <input type="checkbox" id="${ticket.title}" class="checkbox">
      <td>${ticket.title}</td>
      <td>${ticket.id}</td>
      <td>${ticket.assignedPersonel}</td>
      <td>${ticket.importance}</td>
      <td>${ticket.status}</td>
      <td>${ticket.ticketType}</td>
      <td>${ticket.date}</td>
      `;
    list.appendChild(row);
    row.setAttribute("id", `${ticket.title}`);
  }
  static addTicketToDashboard(ticket) {
    const list = document.querySelector("#dashboardRecentTicketList");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${ticket.id}</td>
        <td>${ticket.description}</td>
        <td>${ticket.importance}</td>
       `;
    list.appendChild(row);
  }
  static displayTicketDetials(e) {
    let ticket = e.target.parentElement;
    let displayTicket = Store.getTickets();
    let modal = document.querySelector("#overlayTicketDetials");
    modal.classList.remove("hide");
    let ticketDetialName = document.querySelector(".ticketDetailName");
    ticketDetialName.innerHTML = `${ticket.id}`;
    ticketDetialName.setAttribute("id", `${ticket.id}`);

    for (let i = 0; i < displayTicket.length; i++) {
      if (displayTicket[i].title === ticket.id) {
        //display tickets in project details
        const list = document.querySelector("#detailsForTicket");
        const row = document.createElement("tr");
        row.setAttribute("id", `${displayTicket[i].title}`);
        row.innerHTML = `
      <td>${displayTicket[i].title}</td>
      <td>${displayTicket[i].id}</td>
      <td>${displayTicket[i].assignedPersonel}</td>
      <td>${displayTicket[i].importance}</td>
      <td>${displayTicket[i].status}</td>
      <td>${displayTicket[i].ticketType}</td>
      <td>${displayTicket[i].date}</td>`;
        list.appendChild(row);

        // data-id to append for comment id
        let ticketContainer = document.querySelector(".ticketContainer");
        ticketContainer.setAttribute("data-title", `${displayTicket[i].title}`);
        ticketContainer.setAttribute("data-id", `${displayTicket[i].id}`);

        // display description in table below
        const listDescription = document.querySelector("#descriptionForTicket");
        const rowDescription = document.createElement("tr");
        rowDescription.innerHTML = `
        <td>${displayTicket[i].description}</td>`;
        listDescription.appendChild(rowDescription);

        //display comments in this Modal
        function displayComments() {}
        displayComments();
      }
    }
  }
  static clearTicketInputs() {
    document.querySelector("#title-Ticket").value = "";
    document.querySelector("#assignPersonel-Ticket").value = "";
    document.querySelector("#type-Ticket").value = "";
    document.querySelector("#desctiption-Ticket").value;
    // document.querySelector("#date-Ticket").value = "";
    // document.querySelector("#targetDate-Ticket").value = "";
    // document.querySelector("#commenter-Ticket").value = "";
  }
  static submitCloseModalTicket() {
    document.querySelector("#overlayTicketInput").classList.add("hide");
  }
  static invalidAlertTicket() {
    //color
    function invalidColor(r, g, b, a) {
      return `rgba(${255}, ${0}, ${0}, ${0.5})`;
    }
    function overlayNormal(r, g, b, a) {
      return `rgba(${0}, ${0}, ${0}, ${0.4})`;
    }
    function whiteColor(r, g, b, a) {
      return `rgba(${255}, ${255}, ${255}, ${1})`;
    }
    function invalidInput() {
      //inputs
      const title = document.querySelector("#title-Ticket");
      const id = document.querySelector("#projectId");
      const description = document.querySelector("#desctiption-Ticket");
      const assignedPersonel = document.querySelector("#assignPersonel-Ticket");
      const importance = document.querySelector("#importance-Ticket");
      const status = document.querySelector("#status-Ticket");
      const ticketType = document.querySelector("#type-Ticket");
      const date = document.querySelector("#date-Ticket");
      //overlay
      const overlay = document.querySelector("#overlayTicketInput");
      //set Color
      title.style.backgroundColor = invalidColor();
      id.style.backgroundColor = invalidColor();
      description.style.backgroundColor = invalidColor();
      assignedPersonel.style.backgroundColor = invalidColor();
      importance.style.backgroundColor = invalidColor();
      status.style.backgroundColor = invalidColor();
      ticketType.style.backgroundColor = invalidColor();
      date.style.backgroundColor = invalidColor();
      //overlay
      overlay.style.backgroundColor = invalidColor();

      title.placeholder = "Enter Valid Input";
      id.placeholder = "Enter Valid Input";
      description.placeholder = "Enter Valid Input";
      assignedPersonel.placeholder = "Enter Valid Input";
      importance.placeholder = "Enter Valid Input";
      status.placeholder = "Enter Valid Input";
      ticketType.placeholder = "Enter Valid Input";
      // date.value = "Enter Valid Input";

      title.style.color = "white";
      id.style.color = "white";
      description.style.color = "white";
      assignedPersonel.style.color = "white";
      importance.style.color = "white";
      status.style.color = "white";
      ticketType.style.color = "white";
      date.style.color = "white";
    }
    function exitInvalid() {
      const title = document.querySelector("#title-Ticket");
      const id = document.querySelector("#projectId");
      const description = document.querySelector("#desctiption-Ticket");
      const assignedPersonel = document.querySelector("#assignPersonel-Ticket");
      const importance = document.querySelector("#importance-Ticket");
      const status = document.querySelector("#status-Ticket");
      const ticketType = document.querySelector("#type-Ticket");
      const date = document.querySelector("#date-Ticket");
      //overlay
      const overlay = document.querySelector("#overlayTicketInput");
      //set Color
      title.style.backgroundColor = whiteColor();
      id.style.backgroundColor = whiteColor();
      description.style.backgroundColor = whiteColor();
      assignedPersonel.style.backgroundColor = whiteColor();
      importance.style.backgroundColor = whiteColor();
      status.style.backgroundColor = whiteColor();
      ticketType.style.backgroundColor = whiteColor();
      date.style.backgroundColor = whiteColor();
      //overlay
      overlay.style.backgroundColor = overlayNormal();

      title.placeholder = "Title";
      id.placeholder = "Project Name";
      description.placeholder = "Desciption";
      assignedPersonel.placeholder = "Assign Personel";
      importance.placeholder = "Importance";
      status.placeholder = "Status";
      ticketType.placeholder = "Ticket Type";
      // date.value = "Date";

      title.style.color = "Black";
      id.style.color = "Black";
      description.style.color = "Black";
      assignedPersonel.style.color = "Black";
      importance.style.color = "Black";
      status.style.color = "Black";
      ticketType.style.color = "Black";
      date.style.color = "Black";
      overlay.style.color = "Black";
    }
    invalidInput();
    setTimeout(function () {
      exitInvalid();
    }, 3000);
  }
  static clearDataId() {
    let ticketContainer = document.querySelector(".ticketContainer");
    delete ticketContainer.dataset.id;
    delete ticketContainer.dataset.title;
  }
  static ticketInputId() {
    const projectId = Store.getProjects();
    const projectIdList = document.querySelector("#projectId");

    for (let i = 0; i < projectId.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = projectId[i].id;
      option.setAttribute("value", projectId[i].id);
      projectIdList.appendChild(option);
    }
  }

  //UI for details
  static clearProjectDetails() {
    document.querySelector("#assignedTicketsList").innerHTML = "";
  }
  static clearTicketDetails() {
    document.querySelector("#detailsForTicket").innerHTML = "";
    document.querySelector("#descriptionForTicket").innerHTML = "";
  }
  static submitCloseModalComment() {
    document.querySelector("#overlayCommentInput").classList.add("hide");
    document.querySelector("#overlayTicketDetials").classList.remove("hide");
  }
  static clearCommentInput() {
    document.querySelector("#commenter").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#dateComment").value = "";
  }

  //UI for Ticket Comments
  static displayComments() {
    const comments = Store.getComments();

    comments.forEach((comment) => UI.addCommentToList(comment));
  }
  //This also contains delete function
  static addCommentToList(ticket) {
    let displayComments = Store.getComments();

    for (let i = 0; i < displayComments.length; i++) {
      if (displayComments[i].title == ticket.id) {
        const listComment = document.querySelector("#commentList");
        const rowComment = document.createElement("tr");
        rowComment.setAttribute("id", `${displayComments[i].message}`);
        rowComment.innerHTML = `
          <td>${displayComments[i].commenter}</td>
          <td>${displayComments[i].message}</td>
          <td>${displayComments[i].date}</td>
          <button class="btn deleteCommentBtn" id="${displayComments[i].message}">Delete</button>
          `;
        listComment.appendChild(rowComment);
        console.log(displayComments[i]);

        //delet comment function
        let btn = document.querySelectorAll(".deleteCommentBtn");
        console.log(btn);

        function deleteComment() {
          btn.forEach((btn) => {
            btn.addEventListener("click", () => {
              if (btn.id === rowComment.id) {
                rowComment.remove();
                Store.removeComment();
                UI.commentDeletedAlert();
                console.log(Store.getComments());
              }
            });
          });
        }
        deleteComment();
      }
    }
  }
  static clearCommentList() {
    document.querySelector("#commentList").innerHTML = "";
  }
  static invalidAlertComment() {
    // quirySelectors
    const commeter = document.querySelector("#commenter");
    const message = document.querySelector("#message");
    const date = document.querySelector("#dateComment");
    const overlay = document.querySelector("#overlayCommentInput");

    //color
    function invalidColor(r, g, b, a) {
      return `rgba(${255}, ${0}, ${0}, ${0.5})`;
    }
    function overlayNormal(r, g, b, a) {
      return `rgba(${0}, ${0}, ${0}, ${0.4})`;
    }
    function whiteColor(r, g, b, a) {
      return `rgba(${255}, ${255}, ${255}, ${1})`;
    }
    function invalidInput() {
      //set Color
      commeter.style.backgroundColor = invalidColor();
      message.style.backgroundColor = invalidColor();
      date.style.backgroundColor = invalidColor();

      //overlay
      overlay.style.backgroundColor = invalidColor();

      commeter.placeholder = "Enter Valid Input";
      message.placeholder = "Enter Valid Input";
      date.placeholder = "Enter Valid Input";

      // date.value = "Enter Valid Input";

      commeter.style.color = "white";
      message.style.color = "white";
      date.style.color = "white";
    }
    function exitInvalid() {
      //set Color
      commeter.style.backgroundColor = whiteColor();
      message.style.backgroundColor = whiteColor();
      date.style.backgroundColor = whiteColor();

      //overlay
      overlay.style.backgroundColor = overlayNormal();

      commeter.placeholder = "Title";
      message.placeholder = "Project Name";
      date.placeholder = "Desciption";

      // date.value = "Date";

      commeter.style.color = "Black";
      message.style.color = "Black";
      date.style.color = "Black";
    }
    invalidInput();
    setTimeout(function () {
      exitInvalid();
    }, 3000);
  }
  static commentDeletedAlert() {
    let h6 = document.querySelector("#alertComments");
    function successfull() {
      h6.innerHTML = "COMMENT DELETED";
      h6.style.backgroundColor = "red";
    }
    function backToNormal() {
      h6.innerHTML = "All comments for this ticket";
      h6.style.backgroundColor = "white";
    }
    successfull();
    setTimeout(function () {
      backToNormal();
    }, 3000);
  }
  static commentDeletedAlert() {
    let h6 = document.querySelector("#alertComments");

    function successfull() {
      h6.innerHTML = "Comment has been deleted";
      h6.style.backgroundColor = "red";
    }
    function backToNormal() {
      h6.innerHTML = "All comments for this ticket";
      h6.style.backgroundColor = "white";
    }
    successfull();
    setTimeout(function () {
      backToNormal();
    }, 3000);
  }
  static commentAddedAlert() {
    let h6 = document.querySelector("#alertComments");

    function successfull() {
      h6.innerHTML = "Comment has been added";
      h6.style.backgroundColor = "green";
    }
    function backToNormal() {
      h6.innerHTML = "All comments for this ticket";
      h6.style.backgroundColor = "white";
    }
    successfull();
    setTimeout(function () {
      backToNormal();
    }, 3000);
  }
}

//Storage Class
class Store {
  //Store Projects
  static getProjects() {
    let projects;
    if (localStorage.getItem("projects") === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem("projects"));
    }
    return projects;
  }
  static addProject(project) {
    const projects = Store.getProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static removeProject(id) {
    const projects = Store.getProjects();
    projects.forEach((project, index) => {
      if (project.id === id) {
        projects.splice(index, 1);
      }
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  // storeTickets
  static getTickets() {
    let tickets;
    if (localStorage.getItem("tickets") === null) {
      tickets = [];
    } else {
      tickets = JSON.parse(localStorage.getItem("tickets"));
    }
    return tickets;
  }
  static addTicket(ticket) {
    const tickets = Store.getTickets();
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }
  static removeTicket(id) {
    const tickets = Store.getTickets();
    tickets.forEach((ticket, index) => {
      if (ticket.id === id) {
        tickets.splice(index, 1);
      }
    });
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }
  //storeComments
  static getComments() {
    let comments;
    if (localStorage.getItem("comments") === null) {
      comments = [];
    } else {
      comments = JSON.parse(localStorage.getItem("comments"));
    }
    return comments;
  }
  static addComment(comment) {
    const comments = Store.getComments();
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  static removeComment(id, title) {
    const comments = Store.getComments();
    comments.forEach((comment, index) => {
      if (comment.id === id) {
        comments.splice(index, 1);
      } else if (comment.title === title) {
        comments.splice(index, 1);
      }
    });
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}
//DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", UI.UIDashboard);
document.addEventListener("DOMContentLoaded", UI.displayTickets);
document.addEventListener("DOMContentLoaded", UI.displayProjects);
document.addEventListener("DOMContentLoaded", UI.ticketInputId);
document.addEventListener("DOMContentLoaded", UI.displayComments);

// Add Project Input Listiner
document
  .querySelector("#overlayProjectInput")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.querySelector("#id").value;
    const details = document.querySelector("#details").value;
    const status = document.querySelector("#status").value;
    const importance = document.querySelector("#importance").value;
    const date = document.querySelector("#date").value;
    const targetDate = document.querySelector("#targetDate").value;

    //Validate inputs
    if (
      id === "" ||
      details === "" ||
      status === "" ||
      importance === "" ||
      date === "" ||
      targetDate === ""
    ) {
      UI.invalidAlertProject();
    } else {
      const project = new Project(
        id,
        details,
        status,
        importance,
        date,
        targetDate
      );

      UI.addProjectToList(project);
      UI.successfullAlert();
      UI.addProjectToDashboard(project);
      Store.addProject(project);
      UI.clearProjectInputs();
      UI.submitCloseModalProject();
      UI.UIDashboard();
      UI.ticketInputId();
    }
  });

//Add Ticket Input Listiner
document
  .querySelector("#overlayTicketInput")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title-Ticket").value;
    const id = document.querySelector("#projectId").value;
    const description = document.querySelector("#desctiption-Ticket").value;
    const assignedPersonel = document.querySelector(
      "#assignPersonel-Ticket"
    ).value;
    const importance = document.querySelector("#importance-Ticket").value;
    const status = document.querySelector("#status-Ticket").value;
    const ticketType = document.querySelector("#type-Ticket").value;
    const date = document.querySelector("#date-Ticket").value;

    //Validate inputs
    if (
      title === "" ||
      id === "" ||
      description === "" ||
      assignedPersonel === "" ||
      importance === "" ||
      status === "" ||
      ticketType === "" ||
      date === ""
    ) {
      UI.invalidAlertTicket();
    } else {
      //Instantiate Ticket
      const ticket = new Ticket(
        title,
        id,
        description,
        assignedPersonel,
        importance,
        status,
        ticketType,
        date
      );
      UI.addTicketToList(ticket);
      UI.addTicketToDashboard(ticket);
      UI.successfullAlert();
      Store.addTicket(ticket);
      UI.clearTicketInputs();
      UI.submitCloseModalTicket();
      UI.UIDashboard();
    }
  });

//Open Project Details
document.querySelector("#projectList").addEventListener("click", (e) => {
  UI.openProjectDetials(e);
});

//Open Ticket Detials + add Comment
document.querySelector("#ticketList").addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    return;
  }

  //ticket is used for its id in addCommentToList
  let ticket = e.target.parentElement;

  //access ticket storage
  let displayTicket = Store.getTickets();
  UI.displayTicketDetials(e, displayTicket);
  //UI.addCommentToList also contains delete fnction for it
  UI.addCommentToList(ticket);
});

//Add Comment
document
  .querySelector("#overlayCommentInput")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    let ticketContainer = document.querySelector(".ticketContainer");
    console.log(ticketContainer);
    const commenter = document.querySelector("#commenter").value;
    const message = document.querySelector("#message").value;
    const date = document.querySelector("#dateComment").value;
    const title = ticketContainer.dataset.title;
    const id = ticketContainer.dataset.id;

    if (commenter === "" || message === "" || date === "") {
      UI.invalidAlertComment();
    } else {
      const comment = new Comment(commenter, message, date, title, id);
      Store.addComment(comment);
      UI.addCommentToList(e);
      UI.clearCommentInput();
      UI.submitCloseModalComment();
      UI.successfullAlert();
      UI.commentAddedAlert();
      console.log(comment);
    }
  });

//Delete Project + all tickets/comments associated
document.querySelector(".deleteProject").addEventListener("click", (e) => {
  /* Project deletes all tickets as well as comments with the same ID */

  let id = document.querySelector(".projectDetailName");
  let projects = document.querySelector("#projectList");
  storedProjects = Store.getProjects();
  storedTickets = Store.getTickets();
  storedComments = Store.getComments();

  //delete UI project from List
  for (let i = 0; i < projects.children.length; i++) {
    if (id.id === projects.children[i].id) {
      projects.children[i].remove();
    }
  }
  //Delete comments belonging to this project/ticket
  for (let i = 0; i < storedComments.length; i++) {
    if (id.id === storedComments[i].id) {
      Store.removeComment(storedComments[i].id);
    }
  }
  // delete Ticket from Store
  for (let i = 0; i < storedTickets.length; i++) {
    if (storedTickets[i].id === id.id) {
      Store.removeTicket(storedTickets[i].id);
    }
  }
  //Delete Project from Store working
  for (let i = 0; i < storedProjects.length; i++) {
    if (storedProjects[i].id === id.id) {
      Store.removeProject(storedProjects[i].id);
    }
  }
  closeProjectDetail();
});

//Delete Ticket + all comments associated
document.querySelector(".deleteTicket").addEventListener("click", (e) => {
  /*Ticket deletes all comments associated with it */

  let id = document.querySelector(".ticketDetailName");
  let tickets = document.querySelector("#ticketList");

  storedComments = Store.getComments();
  storedTickets = Store.getTickets();
  console.log(id.id)
  //delete UI ticket from List
  for (let i = 0; i < tickets.children.length; i++) {
    if (id.id === tickets.children[i].id) {
      tickets.children[i].remove();
    }
  }

  //Delete comments belonging to this project/ticket
  for (let i = 0; i < storedComments.length; i++) {
    if (id.id === storedComments[i].title) {
      Store.removeComment(storedComments[i].id);
    }
  }
  // delete Ticket from Store
  for (let i = 0; i < storedTickets.length; i++) {
    if (storedTickets[i].title === id.id) {
      Store.removeTicket(storedTickets[i].id);
    }
  }
  closeTicketDetail()
  console.log("hey");
});
