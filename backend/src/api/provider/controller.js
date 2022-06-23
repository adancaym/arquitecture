import { success, notFound } from "../../services/response/";
import { Provider } from ".";
import { Process } from "../process";

export const create = ({ bodymen: { body } }, res, next) =>
  Provider.create(body)
    .then((provider) => provider.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Provider.count(query)
    .then((count) =>
      Provider.find(query, select, cursor).then((providers) => ({
        count,
        rows: providers.map((provider) => provider.view()),
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => (provider ? provider.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) =>
      provider ? Object.assign(provider, body).save() : null
    )
    .then((provider) => (provider ? provider.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => (provider ? provider.remove() : null))
    .then(success(res, 204))
    .catch(next);

// TODO si existen mas debe crearse un query para balancear el proceso.
export const FindProcessCreateCollection = () =>
  Process.findOne({ name: "create-collection" })
    .populate("provider")
    .then((process) => process.provider.view());

export const FindProcessExtractEvents = () =>
  Process.findOne({ name: "extract-events" })
    .populate("provider")
    .then((process) => process.provider.view());

export const FindProcessIdCreateCollection = () =>
  FindProcessCreateCollection().then((provider) => provider.id);

export const FindKeyIdToFetchAsset = (provider) => {
  // TODO aqui se hace el query para valancear el proceso.
  const [apikey] = provider.keyId;
  return apikey;
};
export const FindKeyPublicKey = (provider) => {
  // TODO aqui se hace el query para valancear el proceso.
  return "2f6f419a083c46de9d83ce3dbe7db601";
};
