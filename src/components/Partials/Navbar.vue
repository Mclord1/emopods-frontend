<template>
    <nav class="navbar navbar-expand-lg navbar-dark" id="topnav">
        <div class="container">

            <!-- Brand -->
            <a class="navbar-brand mr-10" href="/">
                <img src="../../assets/img/cda_logo.jpeg" alt="..." class="navbar-brand-img">
            </a>

            <!-- Collapse -->
            <div class="collapse navbar-collapse me-lg-auto" id="navbar">

                <!-- Form -->
                <form class="mt-4 mb-3 d-md-none">
                    <input type="search" class="form-control form-control-rounded" placeholder="Search" aria-label="Search">
                </form>

                <!-- Navigation -->
                <ul class="navbar-nav me-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="offcanvas" href="#offcanvasDemo" aria-controls="offcanvasDemo">
                            Home
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="offcanvas" href="#offcanvasDemo" aria-controls="offcanvasDemo">
                            Members
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle active" href="#" id="topnavDashboards" role="button" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="true">
                            Access Control
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="topnavDashboards">
                            <li>
                                <a class="dropdown-item active" href="index.html">
                                    Roles
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item " href="dashboard-project-management.html">
                                    Permissions
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item " href="dashboard-ecommerce.html">
                                    Users
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>

            <!-- Toggler -->
            <button class="navbar-toggler me-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Form -->
            <form class="form-inline me-4 d-none d-lg-flex">
                <div class="input-group input-group-rounded input-group-merge input-group-reverse" data-list='{"valueNames": ["name"]}'>

                    <!-- Input -->
                    <input type="search" class="form-control dropdown-toggle list-search" data-bs-toggle="dropdown" placeholder="Search"
                        aria-label="Search">

                    <!-- Icon -->
                    <div class="input-group-text">
                        <i class="fe fe-search"></i>
                    </div>

                    <!-- Menu -->
                    <div class="dropdown-menu dropdown-menu-card">
                        <div class="card-body">

                            <!-- List group -->
                            <div class="list-group list-group-flush list-group-focus list my-n3">
                                <a class="list-group-item" href="team-overview.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar">
                                                <img src="../../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Airbnb
                                            </h4>

                                            <!-- Time -->
                                            <p class="small text-muted mb-0">
                                                <span class="fe fe-clock"></span> <time datetime="2018-05-24">Updated 2hr ago</time>
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="team-overview.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar">
                                                <img src="../../assets/img/avatars/teams/team-logo-2.jpg" alt="..." class="avatar-img rounded">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Medium Corporation
                                            </h4>

                                            <!-- Time -->
                                            <p class="small text-muted mb-0">
                                                <span class="fe fe-clock"></span> <time datetime="2018-05-24">Updated 2hr ago</time>
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="project-overview.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-4by3">
                                                <img src="../../assets/img/avatars/projects/project-1.jpg" alt="..." class="avatar-img rounded">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Homepage Redesign
                                            </h4>

                                            <!-- Time -->
                                            <p class="small text-muted mb-0">
                                                <span class="fe fe-clock"></span> <time datetime="2018-05-24">Updated 4hr ago</time>
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="project-overview.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-4by3">
                                                <img src="../../assets/img/avatars/projects/project-2.jpg" alt="..." class="avatar-img rounded">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Travels & Time
                                            </h4>

                                            <!-- Time -->
                                            <p class="small text-muted mb-0">
                                                <span class="fe fe-clock"></span> <time datetime="2018-05-24">Updated 4hr ago</time>
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="project-overview.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-4by3">
                                                <img src="../../assets/img/avatars/projects/project-3.jpg" alt="..." class="avatar-img rounded">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Safari Exploration
                                            </h4>

                                            <!-- Time -->
                                            <p class="small text-muted mb-0">
                                                <span class="fe fe-clock"></span> <time datetime="2018-05-24">Updated 4hr ago</time>
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="profile-posts.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar">
                                                <img src="../../assets/img/avatars/profiles/avatar-1.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Dianna Smiley
                                            </h4>

                                            <!-- Status -->
                                            <p class="text-body small mb-0">
                                                <span class="text-success">●</span> Online
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item" href="profile-posts.html">
                                    <div class="row align-items-center">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar">
                                                <img src="../../assets/img/avatars/profiles/avatar-2.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Title -->
                                            <h4 class="text-body text-focus mb-1 name">
                                                Ab Hadley
                                            </h4>

                                            <!-- Status -->
                                            <p class="text-body small mb-0">
                                                <span class="text-danger">●</span> Offline
                                            </p>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                            </div>

                        </div>
                    </div> <!-- / .dropdown-menu -->

                </div>
            </form>

            <!-- User -->
            <div class="navbar-user">

                <!-- Dropdown -->
                <div class="dropdown me-4 d-none d-lg-flex">

                    <!-- Toggle -->
                    <a href="#" class="navbar-user-link" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="icon active">
                            <i class="fe fe-bell"></i>
                        </span>
                    </a>

                    <!-- Menu -->
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-card">
                        <div class="card-header">

                            <!-- Title -->
                            <h5 class="card-header-title">
                                Notifications
                            </h5>

                            <!-- Link -->
                            <a href="#!" class="small">
                                View all
                            </a>

                        </div> <!-- / .card-header -->
                        <div class="card-body">

                            <!-- List group -->
                            <div class="list-group list-group-flush list-group-activity my-n3">
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-1.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Dianna Smiley</strong> shared your post with Ab Hadley, Adolfo Hess, and 3 others.
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-2.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Ab Hadley</strong> reacted to your post with a 😍
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-3.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Adolfo Hess</strong> commented <blockquote class="mb-0">“I don’t think this really makes sense to
                                                    do without approval
                                                    from Johnathan since he’s the one...” </blockquote>
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-4.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Daniela Dewitt</strong> subscribed to you.
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-5.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Miyah Myles</strong> shared your post with Ryu Duke, Glen Rouse, and 3 others.
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-6.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Ryu Duke</strong> reacted to your post with a 😍
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-7.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Glen Rouse</strong> commented <blockquote class="mb-0">“I don’t think this really makes sense to
                                                    do without approval
                                                    from Johnathan since he’s the one...” </blockquote>
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                                <a class="list-group-item text-reset" href="#!">
                                    <div class="row">
                                        <div class="col-auto">

                                            <!-- Avatar -->
                                            <div class="avatar avatar-sm">
                                                <img src="../../assets/img/avatars/profiles/avatar-8.jpg" alt="..." class="avatar-img rounded-circle">
                                            </div>

                                        </div>
                                        <div class="col ms-n2">

                                            <!-- Content -->
                                            <div class="small">
                                                <strong>Grace Gross</strong> subscribed to you.
                                            </div>

                                            <!-- Time -->
                                            <small class="text-muted">
                                                2m ago
                                            </small>

                                        </div>
                                    </div> <!-- / .row -->
                                </a>
                            </div>

                        </div>
                    </div> <!-- / .dropdown-menu -->

                </div>

                <!-- Dropdown -->
                <div class="dropdown">

                    <!-- Toggle -->
                    <a href="#" class="avatar avatar-sm avatar-online dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <img src="../../assets/img/avatars/profiles/avatar-1.jpg" alt="..." class="avatar-img rounded-circle">
                    </a>

                    <!-- Menu -->
                    <div class="dropdown-menu dropdown-menu-end">
                        <a href="profile-posts.html" class="dropdown-item">Profile</a>
                        <a href="account-general.html" class="dropdown-item">Settings</a>
                        <hr class="dropdown-divider">
                        <a href="sign-in.html" class="dropdown-item">Logout</a>
                    </div>

                </div>

            </div>



        </div> <!-- / .container -->
    </nav>
</template>
<script>
export default {

}
</script>
<style scoped>
.container {
    padding: 0 25px;
}
</style>