import S from '@sanity/desk-tool/structure-builder';
import { BsGearFill } from 'react-icons/bs';

export default () =>
  S.list()
    .title('Content')
    .items([
      // Any spread in any pages we don't manually add here
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
      // Site settings
      S.listItem()
        .title('Settings')
        .icon(BsGearFill)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
    ]);
