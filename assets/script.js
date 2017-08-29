$(function() {
    //console.log('hi');
    //let key = '7hjAVdcSGwcE1mN5nmQgbCJ26bPvg3FP';
    let key = '7hjAVdcSGwcE1mN5nmQgbCJ26bPvg3FP';


    if ($('#index').length > 0) {

        let urlProjects = 'https://api.behance.net/v2/users/hellogalima/projects?client_id=' + key;

        console.log(urlProjects);

        $.ajax({
            url: urlProjects,
            dataType: 'jsonp',
            success: function(res) {
                let projects = res.projects;
                _(projects).each(function(project) {
                    $('<div class="cover"><h4 class="projectName">' + project.name + '</h4><img src="' + project.covers[230] + '"><a class="seemore" href="project.html?projectid=' + project.id + '">See more</a></div>').appendTo('.projects');

                });
            }
        });
    }

    if ($('#project').length > 0) {

        var pageURL = new URL(document.location);
        let params = pageURL.searchParams;
        let projectid = params.get('projectid');

        let urlProject = 'http://www.behance.net/v2/projects/' + projectid + '?api_key=' + key;

        $.ajax({
            url: urlProject,
            dataType: 'jsonp',
            success: function(res) {
                let project = res.project;

                $('<h1 class="project-title">' + project.name + '</h1>').appendTo('.container');
                $('<p>' + project.description + '</p>').appendTo('.container');
                $('<h3 class="project-moment">' + moment.unix(project.published_on).fromNow() + '</h3>').appendTo('.container');
                //$('<img src="' + project.covers.original + '">').appendTo('.container');
                $('<img src="' + project.covers.original + '">').appendTo('.container');

            }
        });
        //console.log(urlProject);


        //https://api.behance.net/v2/projects/413699/comments?client_id=1234567890
        //let projectid = params.get('projectid');

        let urlComment = 'https://api.behance.net/v2/projects/' + projectid + '/comments?client_id=' + key;

        $.ajax({
            url: urlComment,
            dataType: 'jsonp',
            success: function(res) {
                let comments = res.comments;
                for (var i = 0; i < comments.length; i++) {
                   // $('<div class="comment-title">' + comments[i].comment + '</div>').appendTo('.comment');
                    $('<h4 class="comment-section">' + comments[i].comment + '</h4>').appendTo('.comment');
                    $('<h2 class="comment-username">' + comments[i].user.username + '</h2>').appendTo('.comment');
                    $('<h2 class="comment-country">' + comments[i].user.country + '</h2>').appendTo('.comment');

                }

            }

        });

        console.log(urlComment);
    }

});