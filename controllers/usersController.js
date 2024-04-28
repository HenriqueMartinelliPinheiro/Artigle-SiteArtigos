const express = require("express");
const router = express.Router();
const User = require("./../database/models/User");
const bcrypt = require("bcryptjs");
const adminAuth = require("./../middlewares/adminAuth");
/*
Lista todos os usuários cadastrados no sistema para o administrador.
O administrador tem a opção de editar ou excluir usuários.
 */
router.get("/admin/users",adminAuth,(req,res)=>{
    User.findAll()
    .then((users)=>{
        res.render("admin/users/index",{users:users});
    }).catch((error)=>{
        res.redirect("/admin/articles");
    })
});
//Permite o administrador criar novos usuários administradores.
router.get("/admin/users/create",/*adminAuth,*/(req,res)=>{
    res.render("admin/users/createUsers");
});
//carrega a tela de login
router.get("/login",(req,res)=>{
    res.render("admin/users/login");
});

//faz a autenticação do usuário e retorna um json com os dados do usuário.
router.post("/authenticate",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where: {
        email : email
    }}).then((user)=>{
        if (user!=undefined) {
            let correct = bcrypt.compareSync(password,user.password);
            
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }

            res.json(req.session.user);
            } else{
                res.redirect("/admin/users/login");
            }
        } else{
            res.redirect("/admin/users/login");
        }
    }).catch((error)=>{
        res.redirect("/admin/users/login")
    })
});

//deleta o usuário após uma confirmação do administrador.
router.post("/users/delete",adminAuth,(req,res)=>{
    let id = req.body.id;

    if(id!=undefined && id!=NaN){
        User.destroy({where: {id:id}})
        .then(()=>{
            res.redirect("/admin/users");
        })
        .catch((error)=>{
            res.redirect("/admin/users");
        });
    } else{
        res.redirect("/admin/users");
    }
});

//carrega a tela de edição de usuário baseado no usuário selecionado.
router.get("/admin/users/edit/:id",adminAuth, (req,res)=>{
    let id = req.params.id;
    if(id!=undefined && id!=NaN){
        User.findOne({where: {id:id}})
        .then((user)=>{
            res.render("admin/users/editUser", {user:user});
        }).catch((error)=>{
            res.redirect("/admin/users");
        });
    } else{
        res.redirect("/admin/users");
    }
});

//atualiza o email do usuário escolhido.
router.post("/users/update",adminAuth,(req,res)=>{
    let email = req.body.email;
    let id = req.body.id;

    if(email!=undefined && id!=undefined){
        User.update({email:email},{where: {id:id}})
        .then(()=>{
            res.redirect("/admin/users");
        }).catch((error)=>{
            res.redirect("/admin/users");
        })
    } else{
        res.redirect("/admin/users");
    }
});

//cria um novo usuário se não existir um usuário com o mesmo email.
router.post("/users/create",/*adminAuth,*/(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then((user)=>{
        if (user==undefined) {
            let salt = bcrypt.genSaltSync(231);
            let hash = bcrypt.hashSync(password);
            console.log("Chegou aqui");
            if(email!=undefined && password !=undefined){
                User.create({
                    email: email,
                    password: hash
                }).then(()=>{
                    console.log("Usuário criado com sucesso!")
                    res.redirect("/admin/articles")
                }).catch((error)=>{
                    console.log(error);
                    res.redirect("/admin/articles");
                });
                
            } else{
                res.redirect("/admin/articles")
            }
        } else{
            res.redirect("/admin/users/create");
        }
    })
    .catch((error)=>{
        res.redirect("/admin/articles");
    });
});

module.exports = router;