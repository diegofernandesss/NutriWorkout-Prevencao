import { Routes, Route, Navigate } from "react-router-dom";
import { Cadastro, ListagemUser, CadastroPersonal, CadastroNutricionista, Login, LandingPage, MudarSenhaAdmin, MudarSenhaAtleta, Dashboards, MudarSenhaNutricionista, Home, Cardapio, MudarSenhaPersonal } from "../pages";
import { PrivateRoute } from "./privateRoutes";
import { CreditCardForm } from "../pages/checkout/CreditCardForm";
import { CheckoutAssinatura } from "../pages/checkout/CheckoutAssinatura";
import { HomePersonal } from "../pages/personal/HomePersonal";
import { TabelaTreino } from "../pages/personal/secoes/tabelaTreino";

export default function MainRouters() {
    return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/atleta/cadastro" element={<Cadastro />} />
        <Route path="/cadastroCartao" element={<CreditCardForm />} />
        <Route path="/assinatura" element={<CheckoutAssinatura />} />
        
        {/** Rotas dos Administradores Privados */}
        <Route path="/admin/:id" element={<PrivateRoute panelType="0" />} >
          <Route path="lista/usuarios" element={<ListagemUser />} />
          <Route path="personal/cadastro" element={<CadastroPersonal />} />
          <Route path="nutricionista/cadastro" element={<CadastroNutricionista />} />
          <Route path="mudarSenha" element={<MudarSenhaAdmin />} />
        </Route>

        {/** Rotas dos Atletas Privadas */}
        <Route path="/atleta/:id" element={<PrivateRoute panelType="1" />} >
          <Route index element={<Dashboards />} />
          <Route path="" element={<Dashboards />} />
          <Route path="mudarSenha" element={<MudarSenhaAtleta />} />
        </Route>

        {/** Rotas dos Nutricionistas Privados */}
        <Route path="/nutricionista/:id" element={<PrivateRoute panelType="2" />} >
          <Route index element={<Home />} />
          <Route path="mudarSenha" element={<MudarSenhaNutricionista />} />
          <Route path="cardapio/:id2/:nome" element={<Cardapio />} />
        </Route>

        {/** Rotas dos Personais Privados */}
        <Route path="/personalTrainer/:id" element={<PrivateRoute panelType="3" />} >
          <Route index element={<HomePersonal />} />
          <Route path="tabelaTreino/:id" element={<TabelaTreino />} />
          <Route path="mudarSenha" element={<MudarSenhaPersonal />} />
        </Route>

        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    );
  }