import { saveAstronautProfile } from '../services/profileService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

function Onboarding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    astronautName: '',
    crewId: '',
    role: '',
    missionName: '',
    environment: '',
    startDate: '',
  });


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }
function handleSubmit(event) {
  event.preventDefault();

  const astronautProfile = {
    astronautName: formData.astronautName.trim(),
    crewId: formData.crewId.trim(),
    role: formData.role,
    missionName: formData.missionName.trim(),
    environment: formData.environment,
    startDate: formData.startDate,
  };

  // Guardar o perfil no navegador
  saveAstronautProfile(astronautProfile);

  // Encaminhar para o Dashboard
  navigate('/dashboard', { replace: true });
}

  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <header className="onboarding-header">
          <div className="onboarding-brand">
            <span className="brand-symbol">A</span>
            <span>ASTRO-HEALTH</span>
          </div>

          <span className="step-indicator">PASSO 01 / 01</span>
        </header>

        <div className="onboarding-intro">
          <span className="onboarding-eyebrow">
            CONFIGURAÇÃO INICIAL
          </span>

          <h1>Vamos preparar o teu perfil.</h1>

          <p className="onboarding-description">
            Regista as informações do astronauta e da missão
            para configurar o acompanhamento de saúde.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-heading">
              <span className="section-number">01</span>
              <div>
                <h2>Identificação</h2>
                <p>Informações pessoais e função na tripulação.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="astronautName">Nome completo</label>
              <input
                id="astronautName"
                className="form-control"
                type="text"
                name="astronautName"
                placeholder="Ex.: Alex Johnson"
                value={formData.astronautName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="crewId">ID da tripulação</label>
                <input
                  id="crewId"
                  className="form-control"
                  type="text"
                  name="crewId"
                  placeholder="Ex.: CREW-001"
                  value={formData.crewId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Função</label>
                <select
                  id="role"
                  className="form-control"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecionar função</option>
                  <option value="Astronauta">Astronauta</option>
                  <option value="Comandante">Comandante</option>
                  <option value="Engenheiro de voo">Engenheiro de voo</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-heading">
              <span className="section-number">02</span>
              <div>
                <h2>Informações da missão</h2>
                <p>Define o contexto da missão espacial.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="missionName">Nome da missão</label>
              <input
                id="missionName"
                className="form-control"
                type="text"
                name="missionName"
                placeholder="Ex.: Artemis Mission"
                value={formData.missionName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="environment">Ambiente da missão</label>
                <select
                  id="environment"
                  className="form-control"
                  name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecionar ambiente</option>
                  <option value="Órbita terrestre (LEO)">Órbita terrestre (LEO)</option>
                  <option value="Lua">Lua</option>
                  <option value="Marte">Marte</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Data de início</label>
                <input
                  id="startDate"
                  className="form-control"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="onboarding-footer">
            <p>
              Os dados serão utilizados para configurar o perfil
              de monitorização do astronauta.
            </p>

          <button className="btn btn-primary" type="submit">
            Concluir registo →
         </button>
          </div>
         </form> 
      </section>
    </main>
  );
}

export default Onboarding;
