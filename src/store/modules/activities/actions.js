import { api } from "boot/axios";
import ActivitiesStatusMap from "maps/activitiesStatusMap.json";
import { iconsMapReplations } from "maps/iconsMaps.json";

const MAX_PRESENTATIONS = 4;

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setProfileActivities: ({ commit }, profileActivities) => {
    const preparedTrailsGroup = Object.entries(ActivitiesStatusMap).reduce(
      (amount, [mapIndex, originIndex]) => {
        amount[mapIndex] = profileActivities[originIndex];

        return amount;
      },
      {
        available: [],
        inProgress: [],
        completed: [],
      }
    );

    commit("SET_PROFILE_ACTIVITIES", preparedTrailsGroup);
  },
  getActivities: async ({ getters, dispatch }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilhas");

      const activities = data.turma.trilhas
        .filter((trilha) => trilha.status === "ativo")
        .map((trilhas) => ({
          id: trilhas.detail.id,
          cover: {
            path: trilhas.detail.capa?.path,
            type: trilhas.detail.capa?.tipo,
          },
          name: trilhas.detail.nome,
          description: trilhas.detail.descricao,
        }));

      dispatch("setProfileActivities", data.trilhas);
      const profileActivities = getters.getProfileActivities;

      activities.forEach((activity) => {
        let exists = false;

        Object.entries(profileActivities)
          .reverse()
          .forEach(([activityStatusItem, activityStatusItemActivities]) => {
            if (exists) {
              return;
            }

            exists = activityStatusItemActivities.includes(activity.id);

            if (exists) {
              activity.status = activityStatusItem;
              return;
            }
          });
      });

      const preparedActivitiesGroup = Object.entries(profileActivities).reduce(
        (amount, [mapIndex, activitiesList]) => {
          const activitiesGroup = activitiesList.map((activityId) => {
            return activities.find((trail) => trail.id === activityId);
          });

          amount[mapIndex] = activitiesGroup;

          return amount;
        },
        {
          available: [],
          inProgress: [],
          completed: [],
        }
      );

      return preparedActivitiesGroup;
    } catch (err) {
      console.error("Activities Data Error", err);
    }
  },
  getActivityById: async (_, id) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilha", { id });
      console.log(data);
      // console.log(stages);

      const completeds = [...data.concluidos];

      const activityIsActive = (activity, activityIndex) => {
        return true;
        // console.log("->", activity, activityIndex);
        if (activityIndex === 0) {
          return true;
        }

        return false;
        // const find = stages.find((stage) => datastage.estagio_id === activity.id);
        // console.log(find);
        // return !!find;
      };

      return {
        name: data.nome,
        description: data.descricao,
        cover: data.capa,
        goal: data.objetivo,
        progress: 50,
        reward: {
          coins: 12,
          points: 50,
        },
        activities: data.atividade
          .filter((activity) => activity.status === "ativo")
          .map((activity, activityIndex) => {
            return {
              id: activity.id,
              active: activityIsActive(activity, activityIndex),
              trailId: activity.trilha_id,
              name: activity.nome,
              progress: 20,
              reward: {
                coins: activity.moedas,
                points: activity.pontos,
              },
              types: activity.estagios.reduce((amount, stage) => {
                if (
                  amount.indexOf(iconsMapReplations[stage.tipo.descricao]) !==
                  -1
                ) {
                  return amount;
                }

                amount.push(iconsMapReplations[stage.tipo.descricao]);

                return amount;
              }, []),
              position: activity.ordem + "",
              rank: 2,
              completed: !!completeds.find((completedId, completedIndex) => {
                return false;
                if (completedId === activity.id) {
                  completeds.splice(completedIndex, 1);

                  return true;
                }
              }),
            };
          }),
      };
    } catch (err) {
      console.error("Courses Data by ID Error", err);
    }
  },
  getStagesData: async (_, { stageId }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/estagio", {
        id: stageId,
      });

      return {
        id: data.id,
        name: data.nome,
        description: data.descricao,
        reward: {
          coins: data.moedas,
          points: data.pontos,
        },
        // trailStudentStageId: data.trilhas_alunos_stagios[0],
        stages: data.estagios
          .filter((stage) => stage.status === "ativo")
          .map((stage) => {
            const type = iconsMapReplations[stage.tipo.descricao];
            const content = stage.conteudo;

            let canNext = true;

            if (type === "game-internal") {
              const gamesImages = stage.games_internos_images;

              switch (stage.conteudo.game) {
                case "7-erros":
                  canNext = false;

                  [("left", "right")].forEach((position) => {
                    content.gameData.forEach((_, gameStageIndex) => {
                      const [currentImage] = gamesImages.splice(0, 1);

                      content.gameData[gameStageIndex].images[position] =
                        currentImage.path;
                    });
                  });
                  break;

                case "Quiz":
                  canNext = false;
                  content.game += `--${content.tipo}`;
                  break;

                default:
                  console.warn(`Game "${stage.conteudo.game}" not found`);
                  break;
              }
            }

            return {
              id: stage.id,
              description: stage.descricao,
              type,
              time: stage.tempo,
              content,
              completed: false,
              isInformative: stage.informativo,
              informativeText: stage.titulo,
              canNext,
            };
          }),
      };
    } catch (err) {
      console.error("Stage Data by ID Error", err);
    }
  },
  startActivity: async (_, activityId) => {
    try {
      await api.post("alunos/trilha-aluno-atividade", {
        trilha_id: activityId,
      });
    } catch (err) {
      console.error("Start activity Error", err);
    }
  },
  completeStage: async (
    _,
    { trailId, activityId, completed, trailStudentStageId }
  ) => {
    try {
      const {
        data: { data: data },
      } = await api.post("alunos/trilha-aluno-estagio", {
        trilha_id: trailId,
        estagio_id: activityId,
        trilhas_alunos_stagios_id: 4,
        status: completed ? "sucesso" : "em_andamento",
      });

      return data.id;
    } catch (err) {
      console.error("", err);
    }
  },
  getPdfData: async (_, path) => {
    try {
      const data = await api.post(
        path,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "application/pdf",
            mode: "no-cors",
          },
        }
      );

      // return {
      //   files: data.files,
      //   type: data.tipo.descricao,
      //   cover: data.tipo.path,
      // };
    } catch (err) {
      console.error("Stage PDF Error", err);
    }
  },
  getActivityPresentationId({ state, commit }, activityId) {
    // if (state.watchedList.find((item) => Number(item) === Number(activityId))) {
    //   return null;
    // }

    // commit("AD_TO_WATCHED_LIST", activityId);

    const randomPresentation =
      Math.floor(Math.random() * MAX_PRESENTATIONS) + 1;

    return randomPresentation;
  },
};
